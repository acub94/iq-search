import pandas as pd
import requests
import time
import re
from typing import List

HEADING_REGEX = re.compile(r'^#+ .*$')
WIDGET_REGEX = re.compile(r'^\$\$widget\d(.*?\))\$\$$')
MARKDOWN_LINK_REGEX = re.compile(r'^\[(.*)\]\(.*\)$')
MARKDOWN_IMAGE_REGEX = re.compile(r'^!\[.*\]\(.*\)$')
CITATION_REGEX = re.compile(r'\[\\\[\d+\\\]\]\(#cite-id-[a-z0-9]+\)', flags=re.MULTILINE)

MAX_PARA_COUNT = 3
MAX_CONTENT_LENGTH = 10000

def get_wikis():
    dataFrame = pd.DataFrame(columns=['id', 'title', 'content'])
    offset = 0
    limit = 50
    has_more_data = True

    # GraphQL DB URL for Everipedia wikis
    url = "https://graph.everipedia.org/graphql"

    while has_more_data:
        # Payload
        query = f"""
        {{
            wikis(limit: {limit}, offset: {offset}) {{
                id
                title
                content
            }}
        }}
        """

        # Sending request
        response = requests.post(url=url, json={"query": query})

        # Storing newly fetched data into a DataFrame
        freshDf = pd.DataFrame(response.json()['data']['wikis'])

        # Check if fewer records than the limit are returned
        if len(freshDf) < limit:
            has_more_data = False

        # Concatenating both old & new DataFrames as one
        dataFrame = pd.concat([dataFrame, freshDf], axis=0, ignore_index=True)

        # Increment the offset for the next query
        offset += limit

    # DB may return same wiki multiple times from each request, so drop duplicates if any
    dataFrame = dataFrame.drop_duplicates(subset=['id'])  # id is the unique identifier

    return dataFrame


def sanitize_content(content: str) -> str:
        
    content_paragraphs = content.split('\n\n')
    filtered_paragraphs = [
        p for p in content_paragraphs if is_valid_paragraph(p)
    ]
    sanitized_paragraphs = []
    count = 0

    for paragraph in filtered_paragraphs:
        if count >= MAX_PARA_COUNT:
            break

        trimmed_paragraph = paragraph.strip()
        plain_text_paragraph = remove_markdown_syntax(trimmed_paragraph)
        sanitized_paragraph = CITATION_REGEX.sub('', plain_text_paragraph)
        is_heading = HEADING_REGEX.match(trimmed_paragraph) is not None

        if not is_heading:
            sanitized_paragraphs.append(sanitized_paragraph)
            count += 1
        else:
            sanitized_paragraphs.append(trimmed_paragraph)

    trimmed_content = '\n\n'.join(sanitized_paragraphs)[:MAX_CONTENT_LENGTH]

    return trimmed_content


def is_valid_paragraph(paragraph: str) -> bool:
        
    para = paragraph.strip()
    return (
        len(para) != 0
        and not MARKDOWN_IMAGE_REGEX.match(para)
        and not MARKDOWN_LINK_REGEX.match(para)
        and not WIDGET_REGEX.match(para)
    )


def remove_markdown_syntax(text: str) -> str:
        
    # Remove emphasis syntax
    text = re.sub(r'\*\*?(.*?)\*\*?', r'\1', text)
    text = re.sub(r'__(.*?)__', r'\1', text)

    # Remove code syntax
    text = re.sub(r'`(.+?)`', r'\1', text)

    # Remove links
    text = re.sub(r'\[(.*?)\]\((.*?)\)', r'\1', text)

    # Remove images
    text = re.sub(r'!\[(.*?)\]\((.*?)\)', r'', text)

    return text

def clean(string):
    sample = string

    cleaned = re.sub(r'\xa0',' ',
                    re.sub(r'\s{2,}',' ',
                       re.sub(r'\>','',
                              re.sub(r'\$\$widget0 YOUTUBE@VID\$\$','',
                                    re.sub(r'[#*]+','',
                                          re.sub(r'\\\[\d+\\\]','',
                                                sample))))))
    return cleaned


def getallWikis():
    df = get_wikis()
    df.rename(columns={df.columns[0]: 'wikiid'}, inplace=True)
    df.content = df.content.apply(sanitize_content)
    df.content = df.content.apply(clean)
    return df



