from fetchNewWikis import *
from chunks import *
from updatesupabase import *
from getwikis import *

def main():
    df = fetch_new_wikis_today()
    df.content = df.content.apply(sanitize_content)
    df.content = df.content.apply(clean)
    df = chunking(df)
    for index, row in df.iterrows():
        if row['chunks'] == '':
            df.drop(index, inplace=True)
    df.reset_index(drop=True, inplace=True)

    update_database(df)

if __name__ == '__main__':
    main()