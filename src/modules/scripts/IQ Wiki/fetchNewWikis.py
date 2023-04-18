import requests
from datetime import datetime, date
import pandas as pd
from dateutil import parser

url = "https://graph.everipedia.org/graphql"

query = """
{
    activities(lang: "en") {
        datetime
        content {
            id
            title
            content
        }
    }
}
"""

def fetch_new_wikis(cut_off_date):
    response = requests.post(url=url, json={"query": query})

    if response.status_code == 200:
        data = response.json()
        activities = data["data"]["activities"]

        new_wikis = []
        for activity in activities:
            activity_datetime = parser.parse(activity["datetime"])
            if activity_datetime.date() > cut_off_date:
                new_wikis.append(activity)

        return new_wikis
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return []

def fetch_new_wikis_today():
    # Get today's date
    today = date.today()

    # Get the date for yesterday (to fetch wikis created today)
    cut_off_date = today - pd.Timedelta(days=1)

    new_wikis = fetch_new_wikis(cut_off_date)

    # Create an empty DataFrame with the desired columns
    df = pd.DataFrame(columns=["datetime", "id", "title", "content"])

    # Iterate through new_wikis and populate the DataFrame
    for wiki in new_wikis:
        datetime_str = wiki["datetime"]
        contents = wiki["content"]

        for content in contents:
            content_data = pd.DataFrame({"datetime": [datetime_str],
                                          "id": [content["id"]],
                                          "title": [content["title"]],
                                          "content": [content["content"]]})
            df = pd.concat([df, content_data], ignore_index=True)
    df = df.drop(columns=["datetime"])
    df = df.rename(columns={"id": "wikiid"})
    return df
