import { gql, request } from "graphql-request";
import config from "@/config";
import { useMutation } from "react-query";

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

export const useContentFeedback = () => {
  type ContentFeedbackInput = {
    input: string;
    output: string;
    feedback: FeedbackType;
  };

  return useMutation({
    mutationKey: "contentFeedback",
    mutationFn: async (input: ContentFeedbackInput) => {
      const { contentFeedback } = await request<ContentFeedbackResponseType>(
        config.graphqlUrl,
        CONTENT_FEEDBACK_MUTATION,
        input,
      );
      return contentFeedback;
    },
  });
};
