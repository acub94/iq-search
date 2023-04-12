import { gql, request } from "graphql-request";
import config from "@/config";

const CONTENT_FEEDBACK_MUTATION = gql`
  mutation ContentFeedback(
    $input: String!
    $output: String!
    $feedback: ContentFeedbackType!
  ) {
    contentFeedback(
      site: IQSEARCH
      input: $input
      output: $output
      feedback: $feedback
    )
  }
`;

type ContentFeedbackResponseType = {
  contentFeedback: boolean;
};

export enum Content {
  IQSEARCH = "IQSEARCH",
}

export enum FeedbackType {
  positive = "POSITIVE",
  negative = "NEGATIVE",
}

export const useContentFeedback = async ({
  input,
  output,
  feedback,
}: {
  input: string;
  output: string;
  feedback?: FeedbackType;
}) => {
  try {
    if (feedback) {
      const { contentFeedback } = (await request(
        config.graphqlUrl,
        CONTENT_FEEDBACK_MUTATION,
        {
          input,
          output,
          feedback,
        },
      )) as {
        contentFeedback: ContentFeedbackResponseType;
      };
      return contentFeedback;
    }
  } catch (_error) {
    return null;
  }
};
