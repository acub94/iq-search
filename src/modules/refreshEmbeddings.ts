import config from "@/config";
import { fetchNewWikis } from "./fetchNewWikis";
import removeMarkdown from "markdown-to-text";

export const refreshEmbeddings = async () => {
  // Fetch new wikis from IQ.WIKI
  const newWikis = await fetchNewWikis(
    new Date(Date.now() - config.cronFrequency),
  );

  // Clean the scrapped wikis
  const cleanedWikis = newWikis.map((wiki) => {
    return {
      id: wiki.content[0].id,
      title: wiki.content[0].title,
      content: removeMarkdown(wiki.content[0].content),
    };
  });
  console.log(cleanedWikis);

  // TODO: Chunk the content with langchain

  // TODO: Create embeddings of the chunks

  // TODO: Update supabase with the embeddings
};