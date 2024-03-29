import { z } from "zod";
import { getChunks } from "../modules/getChunks";
import { getClubedResponse } from "../modules/getClubedResponse";
import { procedure, router } from "../trpc";
import config from "@/config";
import { allLocales, localeSchema } from "@/locales";
import { getTranslated } from "../modules/getTranslated";

const answerInputSchema = z.object({
  query: z.string(),
  language: localeSchema.optional(),
  options: z
    .object({
      pgFunction: z.string().optional(),
      similarityThreshold: z.number().optional(),
      matchCount: z.number().optional(),
      temperature: z.number().optional(),
      maxTokens: z.number().optional(),
    })
    .optional(),
});

export const answersRouter = router({
  getAnswer: procedure.input(answerInputSchema).mutation(async ({ input }) => {
    const { query, options, language } = input;
    const {
      pgFunction,
      similarityThreshold,
      matchCount,
      temperature,
      maxTokens,
    } = options || {};

    let translatedQuery = query;

    if (language !== "en") {
      translatedQuery = (await getTranslated({ query })) || query;
    }

    const chunks = await getChunks({
      query: translatedQuery,
      pgFunction: pgFunction || config.defaultDebugOptions.pgTables,
      similarityThreshold:
        similarityThreshold || config.defaultDebugOptions.similarityThreshold,
      matchCount: matchCount || config.defaultDebugOptions.matchCount,
    });

    let result;
    const openAiOptions = {
      temperature: temperature || config.defaultDebugOptions.temperature,
      maxTokens: maxTokens || config.defaultDebugOptions.maxTokens,
    };

    if (chunks.length !== 0) {
      result = await getClubedResponse({
        query,
        chunks,
        openAiOptions,
        language,
      });
    }

    return {
      wikiId: chunks[0].wikiid,
      answer:
        result ||
        allLocales.find((locale) => locale.code === language || "en")
          ?.noAnswer ||
        "No answer found",
      wikiTitle: chunks[0].title,
      chunks,
    };
  }),
});
