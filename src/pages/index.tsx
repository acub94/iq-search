import { ColorModeToggle } from "@/components/ColorToggle";
import Footer from "@/components/Layout/Footer";
import { Box, Flex, VStack, chakra, useToast } from "@chakra-ui/react";
import Header from "@/components/Layout/Header";
import { devLog, transformQuery } from "@/utils/text.utils";
import { trpc } from "@/utils/trpc";
import { useCallback, useEffect, useState } from "react";
import AnswerCard from "@/components/SearchElements/AnswerCard";
import { SearchInput } from "@/components/SearchElements/SearchInput";
import SearchLoading from "@/components/SearchElements/SearchLoading";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { logEvent } from "@/utils/googleAnalytics";

export interface QueryResult {
  query: string;
  answer: string;
  wikiTitle: string;
  wikiId: string;
}

const sendUserEvents = (query: string) => {
  logEvent({
    action: "SEARCH_ATTEMPT",
    label: "SEARCH",
    value: 1,
    category: "search",
  });

  logEvent({
    action: `SEARCH for: ${query}`,
    label: "SEARCH ",
    value: 1,
    category: "search",
  });
};

export default function Home({ searchQuery }: { searchQuery: string }) {
  const router = useRouter();
  const [inputQuery, setInputQuery] = useState<string>("");
  const [result, setResult] = useState<QueryResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { mutateAsync: getAnswer } = trpc.answers.getAnswer.useMutation();

  const handleAISearch = useCallback(
    async (querySearchStr: string) => {
      if (querySearchStr.length === 0) {
        toast({
          title: "Please enter a valid text before searching",
          isClosable: true,
          status: "error",
        });
        return;
      }

      setInputQuery(querySearchStr);
      setLoading(true);

      const transformedQuery = transformQuery(querySearchStr);
      sendUserEvents(transformedQuery);

      const { wikiId, answer, wikiTitle, chunks } = await getAnswer({
        query: transformedQuery,
      });

      devLog(transformedQuery, chunks);
      setResult({ answer, wikiId, query: querySearchStr, wikiTitle });
      setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchQuery],
  );

  useEffect(() => {
    if (searchQuery.length === 0 || searchQuery.slice(1) === "") return;

    void handleAISearch(searchQuery);
  }, [searchQuery, handleAISearch]);

  const handleSearch = async (query: string) => {
    void handleAISearch(query);
    router.push(
      {
        pathname: "/",
        query: `query=${query}`,
      },
      undefined,
      { shallow: true },
    );
  };

  const decodeQueryURL = decodeURI(inputQuery);

  return (
    <>
      {inputQuery && <NextSeo title={`${decodeQueryURL} - search on IQ GPT`} />}
      <Flex direction='column' minH='100vh'>
        <Box w='full' textAlign='right' p='3' position='fixed'>
          <ColorModeToggle />
        </Box>
        <chakra.div flexGrow='1' display='flex' mt={{ md: "10" }}>
          <VStack gap={{ base: "10", md: "6" }} w='full' mt={{ base: "16" }}>
            <Header />
            <VStack w='full' px={{ base: "5", md: 0 }}>
              <SearchInput handleSearch={handleSearch} query={decodeQueryURL} />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx.query;

  if (!query) {
    return {
      props: {
        searchQuery: "",
      },
    };
  }

  return {
    props: {
      searchQuery: query,
    },
  };
};
