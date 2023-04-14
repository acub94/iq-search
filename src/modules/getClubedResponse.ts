import config, { AvailableModels } from "@/config";
import { PGChunk } from "@/types";
import axios from "axios";
import endent from "endent";
import { CreateChatCompletionResponse } from "openai";
import { z } from "zod";
import { env } from "@/env.mjs";

interface GetClubedResponsesArgs {
  query: string;
  chunks: PGChunk[];
  openAiOptions: {
    model: z.infer<typeof AvailableModels>;
    temperature: number;
    maxTokens: number;
  };
}

export const getClubedResponse = async ({
  query,
  chunks,
  openAiOptions,
}: GetClubedResponsesArgs) => {
  const { model, temperature, maxTokens } = openAiOptions;
  const chunksString = chunks.map((chunk) => chunk.content).join("");

  const prompt = endent`
    Use the following passage to answer the query (don't write any questions in output): 
    ${query}\n

    ${chunksString}
  `;

  const body = {
    model,
    messages: [
      {
        role: "system",
        content: config.systemMessage,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: maxTokens,
    temperature,
  };

  const { data, status } = await axios.post<CreateChatCompletionResponse>(
    "https://api.openai.com/v1/chat/completions",
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
    },
  );

  if (status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  return data.choices[0].message?.content;
};
