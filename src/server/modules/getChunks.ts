import { env } from "@/env.mjs";
import { PGChunk } from "@/types";
import { type PrismaClient } from "@prisma/client";
import axios from "axios";
import { CreateEmbeddingResponse } from "openai";

interface getChunksArgs {
  query: string;
  pgFunction: string;
  similarityThreshold: number;
  matchCount: number;
  prisma: PrismaClient;
}

export const getChunks = async ({
  query,
  pgFunction,
  similarityThreshold,
  matchCount,
  prisma,
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

  const embedding = data.data[0].embedding;

  const result: PGChunk[] = await prisma.$queryRaw`
    SELECT * FROM ${pgFunction}(
      query_embedding := ${embedding},
      similarity_threshold := ${similarityThreshold},
      match_count := ${matchCount}
    );
  `;

  return result;
};
