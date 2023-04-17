import { z } from "zod";
import { getChunks } from "../modules/getChunks";
import { getClubedResponse } from "../modules/getClubedResponse";
import { procedure, router } from "../trpc";
import config, { AvailableModels } from "@/config";

const answerInputSchema = z.object({
  query: z.string(),
  options: z
    .object({
      pgFunction: z.string().optional(),
      similarityThreshold: z.number().optional(),
      matchCount: z.number().optional(),
      model: AvailableModels.optional(),
      temperature: z.number().optional(),
      maxTokens: z.number().optional(),
    })
    .optional(),
});

export const answersRouter = router({
  getAnswer: procedure.input(answerInputSchema).mutation(async ({ input }) => {
    const { query, options } = input;
    const {
      pgFunction,
      similarityThreshold,
      matchCount,
      model,
      temperature,
      maxTokens,
    } = options || {};

    const chunks = await getChunks({
      query,
      pgFunction: pgFunction || config.defaultDebugOptions.pgFunction,
      similarityThreshold:
        similarityThreshold || config.defaultDebugOptions.similarityThreshold,
      matchCount: matchCount || config.defaultDebugOptions.matchCount,
    });

    let result;
    const openAiOptions = {
      model: model || config.defaultDebugOptions.model,
      temperature: temperature || config.defaultDebugOptions.temperature,
      maxTokens: maxTokens || config.defaultDebugOptions.maxTokens,
    };

    if (chunks.length !== 0) {
      result = await getClubedResponse({ query, chunks, openAiOptions });
    }

    return {
      wikiId: chunks[0].wikiid,
      answer: result || "Sorry, I don't know how to help with that.",
      wikiTitle: chunks[0].title,
      chunks,
    };
  }),
});
