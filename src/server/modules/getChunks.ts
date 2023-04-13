import { PGChunk } from "@/types";
import { supabaseAdmin } from "@/utils/trpc";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import { CreateEmbeddingResponse } from "openai";

interface getChunksArgs {
  query: string;
  tableName: string;
  similarityThreshold: number;
  matchCount: number;
}

export const getChunks = async ({
  query,
  tableName,
  similarityThreshold,
  matchCount,
}: getChunksArgs) => {
  let input = query;
  if (input[input.length - 1] !== "?") input += "?";
  input = input.replace(/(\w)\?/g, "$1 ?");

  const { data } = await axios.post<CreateEmbeddingResponse>(
    "https://api.openai.com/v1/embeddings",
    {
      model: "text-embedding-ada-002",
      input,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
      },
    },
  );

  const { data: chunks, error } = (await supabaseAdmin.rpc(tableName, {
    query_embedding: data.data[0].embedding,
    similarity_threshold: similarityThreshold,
    match_count: matchCount,
  })) as { data: PGChunk[]; error: any };

  if (error) {
    new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error getting embeddings from supabase",
      cause: error,
    });
  }

  return chunks;
};
