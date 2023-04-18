import { env } from "@/env.mjs";
import axios from "axios";
import endent from "endent";
import { CreateChatCompletionResponse } from "openai";

interface GetTranslatedArgs {
  query: string;
}

export const getTranslated = async ({ query }: GetTranslatedArgs) => {
  const prompt = endent`
    Translate the following text as it is in English: \n
    "${query}"
  `;

  const body = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are Translator. Translate the text given to you in English. Don't write any questions in output or anything else other than the translation.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 100,
    temperature: 0,
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

  console.log("🔊 Translated query: ", data.choices[0].message?.content);
  console.log("🔊 Original query: ", query);

  return data.choices[0].message?.content;
};
