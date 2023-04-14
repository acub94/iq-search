import { TRPCError } from "@trpc/server";
import axios from "axios";
import { CreateEmbeddingResponse } from "openai";
import { env } from "@/env.mjs";

interface getChunksArgs {
  query: string;
  pgFunction: string;
  similarityThreshold: number;
  matchCount: number;
}

export const getChunks = async ({
  query,
  pgFunction,
  similarityThreshold,
  matchCount,
}: getChunksArgs) => {
  const { data } = await axios.post<CreateEmbeddingResponse>(
    "https://api.openai.com/v1/embeddings",
    {
      model: "text-embedding-ada-002",
      input: query,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
    },
  );

  // const { data: chunks, error } = (await supabaseAdmin.rpc(pgFunction, {
  //   query_embedding: data.data[0].embedding,
  //   similarity_threshold: similarityThreshold,
  //   match_count: matchCount,
  // }))

  if (error) {
    new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error getting embeddings from supabase",
      cause: error,
    });
  }

  return chunks;
};
