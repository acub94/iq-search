import os
import openai
import pandas as pd
import psycopg2
from chunks import *
from getwikis import *
from dotenv import load_dotenv
from tenacity import retry, stop_after_attempt, wait_random_exponential

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

df = getallWikis()
df = chunking(df)
print("chunked succesfully")
for index, row in df.iterrows():
    if row['chunks'] == '':
        df.drop(index, inplace=True)
df.reset_index(drop=True, inplace=True)

@retry(wait=wait_random_exponential(min=1, max=60), stop=stop_after_attempt(6))
def get_embedding(text, engine="text-embedding-ada-002"):
   text = text.replace("\n", " ")
   return openai.Embedding.create(input = [text], model=engine)['data'][0]['embedding']

def update_database(df):
    conn = psycopg2.connect(
        host=os.getenv('DATABASE_HOST'),
        database="postgres",
        user="postgres",
        password= os.getenv('DATABASE_PASSWORD')
    )
    cur = conn.cursor()
    print("Connected to DB")
    reframed_df = pd.DataFrame(columns=['source', 'url', 'title', 'content', 'embedding'])
    print("Created reframed_df")

    for index, row in df.iterrows():
        source = 'IQ Wiki'
        url = f"https://iq.wiki/wiki/{row['wikiid']}"
        title = row['title']
        content = row['chunks']
        embedding = get_embedding(content)
        temp_df = pd.DataFrame({'source': [source], 'url': [url], 'title': [title], 'content': [content], 'embedding': [embedding]})
        reframed_df = pd.concat([reframed_df, temp_df], ignore_index=True)

    values = [tuple(x) for x in reframed_df.to_numpy()]
    print(len(values))

    query = "INSERT INTO langchain_150_tokens (source, url, title, content, embedding) VALUES (%s, %s, %s, %s, %s)"
    try:
        cur.executemany(query, values)
        conn.commit()
        print(f"Inserted {len(values)} rows into the database.")
    except psycopg2.Error as e:
        print(f"Error inserting data: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()

def main():
    update_database(df)


if __name__ == '__main__':
    main()
