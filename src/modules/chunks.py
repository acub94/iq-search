from getwikis import *
import tiktoken
import pandas
from langchain.text_splitter import RecursiveCharacterTextSplitter

tokenizer = tiktoken.get_encoding('cl100k_base')

def tiktoken_len(text):
    tokens = tokenizer.encode(
        text,
        disallowed_special=()
    )
    return len(tokens)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=150,
    chunk_overlap=40,  # number of tokens overlap between chunks
    length_function=tiktoken_len,
    separators=['.', '']
)

def chunking():
    df = getallWikis()
    df['chunks'] = df['content'].apply(text_splitter.split_text)
    df_exploded = df.explode('chunks').reset_index(drop=True)
    df_exploded = df_exploded[['wikiid', 'title', 'chunks']]
    return df_exploded
