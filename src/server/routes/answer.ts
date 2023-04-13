import { z } from "zod";
import { getChunks } from "../modules/getChunks";
import { getClubedResponse } from "../modules/getClubedResponse";
import { procedure, router } from "../trpc";

const answerInputSchema = z.object({
  query: z.string(),
  options: z.object({
    tableName: z.string().optional(),
    similarityThreshold: z.number().optional(),
    matchCount: z.number().optional(),
  }),
});

export const answersRouter = router({
  getAnswer: procedure.input(answerInputSchema).query(async ({ input }) => {
    const { query, options } = input;
    const { tableName, similarityThreshold, matchCount } = options;

    const chunks = await getChunks({
      query,
      tableName: tableName || "langchain150tkn_search",
      similarityThreshold: similarityThreshold || 0.76,
      matchCount: matchCount || 5,
    });

    const clubedResponse = await getClubedResponse(query, chunks);

    return clubedResponse;
  }),
});
