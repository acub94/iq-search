import { ColorModeToggle } from "@/components/ColorToggle";
import Footer from "@/components/Layout/Footer";
import { Box, Flex, VStack, chakra, useToast } from "@chakra-ui/react";
import Header from "@/components/Layout/Header";
import { devLog, transformQuery } from "@/utils/text.utils";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import AnswerCard from "@/components/SearchElements/AnswerCard";
import { SearchInput } from "@/components/SearchElements/SearchInput";
import SearchLoading from "@/components/SearchElements/SearchLoading";
import { NextSeo } from "next-seo";

export interface QueryResult {
  query: string;
  answer: string;
  wikiTitle: string;
  wikiId: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<QueryResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { mutateAsync: getAnswer } = trpc.answers.getAnswer.useMutation();

  const handleSearch = async (query: string) => {
    if (query.length === 0) {
      toast({
        title: "Please enter a valid text before searching",
        isClosable: true,
        status: "error",
      });
      return;
    }
    setQuery(query);
    setLoading(true);

    const transformedQuery = transformQuery(query);

    const { wikiId, answer, wikiTitle, chunks } = await getAnswer({
      query: transformedQuery,
    });

    devLog(transformedQuery, chunks);
    setResult({ answer, wikiId, query, wikiTitle });
    setLoading(false);
  };

  return (
    <>
      {query && <NextSeo title={`${query} - search on IQ GPT`} />}
      <Flex direction='column' minH='100vh'>
        <Box w='full' textAlign='right' p='3' position='fixed'>
          <ColorModeToggle />
        </Box>
        <chakra.div flexGrow='1' display='flex' mt={{ md: "10" }}>
          <VStack gap={{ base: "10", md: "6" }} w='full' mt={{ base: "16" }}>
            <Header />
            <VStack w='full' px={{ base: "5", md: 0 }}>
              <SearchInput handleSearch={handleSearch} />
              {loading ? (
                <SearchLoading />
              ) : (
                <VStack w='full' justifyContent='center' alignItems='center'>
                  {result && <AnswerCard result={result} />}
                </VStack>
              )}
            </VStack>
          </VStack>
        </chakra.div>
        <Footer />
      </Flex>
    </>
  );
}
