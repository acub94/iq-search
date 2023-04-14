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
import { NextRouter, useRouter } from "next/router";
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
    action: `SEARCH - ${query}`,
    label: "SEARCH ",
    value: 1,
    category: "search",
  });
};

const navigateToQuery = (router: NextRouter, query: string) => {
  router.push(
    {
      pathname: "/",
      query: `query=${query}`,
    },
    undefined,
    { shallow: true },
  );
};

enum EventType {
  SEARCH = "search",
  URL = "url",
}

export default function Home({ searchQuery }: { searchQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<QueryResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { mutateAsync: getAnswer } = trpc.answers.getAnswer.useMutation();

  const handleQuerySearch = async (
    querySearchStr: string,
    eventType: EventType,
  ) => {
    if (querySearchStr.length === 0) {
      toast({
        title: "Please enter a valid text before searching",
        isClosable: true,
        status: "error",
      });
      return;
    }

    setQuery(querySearchStr);
    setLoading(true);

    const transformedQuery = transformQuery(querySearchStr);
    sendUserEvents(transformedQuery);

    if (eventType === EventType.SEARCH) navigateToQuery(router, querySearchStr);

    const { wikiId, answer, wikiTitle, chunks } = await getAnswer({
      query: transformedQuery,
    });

    devLog(transformedQuery, chunks);
    setResult({ answer, wikiId, query, wikiTitle });
    setLoading(false);
  };

  const handleURLSearch = useCallback(
    async (urlQuery: string) => {
      await handleQuerySearch(urlQuery, EventType.URL);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchQuery],
  );

  useEffect(() => {
    if (searchQuery.length === 0 || searchQuery.slice(1) === "") return;

    void handleURLSearch(searchQuery);
  }, [searchQuery, handleURLSearch]);

  const handleSearch = async (query: string) => {
    await handleQuerySearch(query, EventType.SEARCH);
  };

  const decodeQueryURL = decodeURI(query);

  return (
    <>
      {query && (
        <NextSeo
          title={`${transformQuery(decodeQueryURL)} - search on IQ GPT`}
        />
      )}
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { url } = req;

  if (!url) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const queryValue = url.substring(url.indexOf("=") + 1);

  return {
    props: {
      searchQuery: queryValue,
    },
  };
};
