import { AvailableModels } from "@/server/modules/getClubedResponse";

const config = {
  graphqlUrl:
    process.env.NEXT_PUBLIC_EP_API || "https://api.dev.braindao.org/graphql",
  googleAnalyticsID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  systemMessage:
    "You are an IQ.Wiki representative who loves to help people! Given the following sections from the IQ.Wiki articles, answer the questions using only that information in less than 150 words, outputted in the markdown format. If you are unsure and the answer is not explicitly written in the documentation, say -Sorry, I don't know how to help with that- .",
  defaultOptions: {
    pgFunction: "langchain150tkn_search",
    similarityThreshold: 0.76,
    matchCount: 5,
    model: AvailableModels.Enum["gpt-3.5-turbo"],
    temperature: 0,
    maxTokens: 200,
  },
};

export default config;
