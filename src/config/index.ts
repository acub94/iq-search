import { AvailableModels } from "@/server/modules/getClubedResponse";

const config = {
  graphqlUrl:
    process.env.NEXT_PUBLIC_EP_API || "https://api.dev.braindao.org/graphql",

  defaultOptions: {
    pgFunction: "langchain150tkn_search",
    similarityThreshold: 0.76,
    matchCount: 5,
    model: AvailableModels.GPT_3_5_TURBO,
    temperature: 0,
    maxTokens: 200,
  },
};

export default config;
