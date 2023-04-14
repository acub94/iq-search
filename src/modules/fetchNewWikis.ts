import config from "@/config";
import request, { gql } from "graphql-request";

const query = gql`
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
`;

interface Activity {
  datetime: string;
  content: {
    id: string;
    title: string;
    content: string;
  }[];
}

export const fetchNewWikis = async (cutOffDate: Date) => {
  const { activities } = await request<{ activities: Activity[] }>(
    config.graphqlUrl,
    query,
  );

  const newWikis = activities.filter(
    (activity) => new Date(activity.datetime) > cutOffDate,
  );

  return newWikis;
};