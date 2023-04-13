import { PGChunk } from "@/types";
import axios from "axios";
import endent from "endent";
import { CreateChatCompletionResponse } from "openai";
import { z } from "zod";

export const AvailableModels = z.enum([
  "gpt-4",
  "gpt-4-0314",
  "gpt-4-32k",
  "gpt-4-32k-0314",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-0301",
]);

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
        content:
          "You are an IQ.Wiki representative who loves to help people! Given the following sections from the IQ.Wiki articles, answer the questions using only that information in less than 150 words, outputted in the markdown format. If you are unsure and the answer is not explicitly written in the documentation, say -Sorry, I don't know how to help with that- .",
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
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
      },
    },
  );

  if (status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  return data.choices[0].message?.content;
};
