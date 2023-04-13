import { z } from "zod";
import { getChunks } from "../modules/getChunks";
import { getClubedResponse } from "../modules/getClubedResponse";
import { procedure, router } from "../trpc";
import config from "@/config";

const answerInputSchema = z.object({
  query: z.string(),
  options: z
    .object({
      pgFunction: z.string().optional(),
      similarityThreshold: z.number().optional(),
      matchCount: z.number().optional(),
    })
    .optional(),
});

export const answersRouter = router({
  getAnswer: procedure.input(answerInputSchema).mutation(async ({ input }) => {
    const { query, options } = input;
    const { pgFunction, similarityThreshold, matchCount } = options || {};

    const chunks = await getChunks({
      query,
      pgFunction: pgFunction || config.defaultOptions.pgFunction,
      similarityThreshold:
        similarityThreshold || config.defaultOptions.similarityThreshold,
      matchCount: matchCount || config.defaultOptions.matchCount,
    });

    let result;
    const openAiOptions = {
      model: config.defaultOptions.model,
      temperature: config.defaultOptions.temperature,
      maxTokens: config.defaultOptions.maxTokens,
    };

    if (chunks.length !== 0) {
      result = await getClubedResponse({ query, chunks, openAiOptions });
    }

    return {
      wikiId: chunks[0].wikiid,
      answer: result || "Sorry, I don't know how to help with that.",
      wikiTitle: chunks[0].title,
    };
  }),
});
