import { PGChunk } from "@/types";
import endent from "endent";

export const shortenText = (text: string, val?: number) => {
  const length = val ? val : 40;
  return text?.length > length ? `${text.substring(0, length)}...` : text;
};

export const transformQuery = (query: string): string => {
  let input = query;
  if (input[input.length - 1] !== "?") input += "?";
  input = input.replace(/(\w)\?/g, "$1 ?");
  input = input.charAt(0).toUpperCase() + input.slice(1);
  return input;
};

export const devLog = (transformedQuery: string, chunks: PGChunk[]) => {
  if (process.env.NODE_ENV !== "development") return;
  console.log("🛸 QUERY: ", transformedQuery);
  chunks.forEach((chunk, i) =>
    console.log(endent`
    📄 CHUNK ${i + 1}
    🛟 WIKI TITLE: ${chunk.title} 
    🐳 CONTENT: ${chunk.content}
    `),
  );
};
