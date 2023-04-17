import config from "@/config";
import { env } from "@/env.mjs";
import { PGChunk } from "@/types";
import axios from "axios";
import endent from "endent";
import { CreateChatCompletionResponse } from "openai";

interface GetClubedResponsesArgs {
  query: string;
  chunks: PGChunk[];
  openAiOptions: {
    temperature: number;
    maxTokens: number;
  };
}

export const getClubedResponse = async ({
  query,
  chunks,
  openAiOptions,
}: GetClubedResponsesArgs) => {
  const { temperature, maxTokens } = openAiOptions;
  const chunksString = chunks.map((chunk) => chunk.content).join("");

  const prompt = endent`
    Use the following passage to answer the query (don't write any questions in output): 
    ${query}\n

    ${chunksString}
  `;

  console.log("ℹ️ [OPEN AI] Using Options", openAiOptions);

  const body = {
    model: "gpt-3.5-turbo",
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
