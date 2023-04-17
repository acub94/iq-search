import os
import openai
import supabase
from chunks import *
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')
supabase_url = 'https://ehhsrgjtanyjrpwucoju.supabase.co'
supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
supabase_client = supabase.Client(supabase_url, supabase_key)

df = chunking();
for index, row in df.iterrows():
    if row['chunks'] == '':
        df.drop(index, inplace=True)
df.reset_index(drop=True, inplace=True)
print(df.shape)

def get_embedding(text, engine="text-embedding-ada-002"):
   text = text.replace("\n", " ")
   return openai.Embedding.create(input = [text], model=engine)['data'][0]['embedding']

def main():
   for i in range(0, df.shape[0]):
    embeddings = get_embedding(df.iloc[i,2])
    supabase_client.table("langchain_150_tokens").insert({"source":"IQ Wiki", "url": "https://iq.wiki/wiki/"+df.iloc[i,0], "title": df.iloc[i,1], "content": df.iloc[i,2], "embedding": embeddings }).execute()
    
if __name__ == '__main__':
    main()

