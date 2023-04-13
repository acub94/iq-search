import { PGChunk } from "@/types";
import { transformQuery } from "@/utils/text.utils";
import axios from "axios";
import endent from "endent";
import { CreateChatCompletionResponse } from "openai";

export const getClubedResponse = async (query: string, chunks: PGChunk[]) => {
  const chunksString = chunks.map((chunk) => chunk.content).join("");

  const prompt = endent`
    Use the following passage to answer the query (don't write any questions in output): 
    ${transformQuery(query)}\n

    ${chunksString}
  `;

  const body = {
    model: "gpt-3.5-turbo",
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
    max_tokens: 200,
    temperature: 0.0,
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
    },
  };

  const { data, status } = await axios.post<CreateChatCompletionResponse>(
    "https://api.openai.com/v1/chat/completions",
    body,
    options,
  );

  if (status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  console.log(data);

  return data;
};
