import { env } from "@/env.mjs";
import { z } from "zod";

export const AvailableModels = z.enum([
  "gpt-4",
  "gpt-4-0314",
  "gpt-4-32k",
  "gpt-4-32k-0314",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-0301",
]);

export const AvailablePgTables = z.enum([
  "langchain_search",
  "langchain150tkn_search",
  "wiki_search",
  "wiki_search3",
]);

export const DebugOptionsSchema = z.object({
  pgTables: z.string(),
  similarityThreshold: z.number().min(0).max(1),
  matchCount: z.number().min(1).max(10),
  model: AvailableModels,
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().min(1).max(200),
});

const config = {
  googleAnalyticsID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  graphqlUrl:
    env.NEXT_PUBLIC_EP_API_URL || "https://api.dev.braindao.org/graphql",
  systemMessage:
    "You are an IQ.Wiki representative who loves to help people! Given the following sections from the IQ.Wiki articles, answer the questions using only that information in less than 150 words, outputted in the markdown format. If you are unsure and the answer is not explicitly written in the documentation, say -Sorry, I don't know how to help with that- .",
  defaultDebugOptions: {
    pgTables: AvailablePgTables.Enum.langchain150tkn_search,
    similarityThreshold: 0.76,
    matchCount: 5,
    model: AvailableModels.Values["gpt-3.5-turbo"],
    temperature: 0,
    maxTokens: 200,
  },
};

export default config;
