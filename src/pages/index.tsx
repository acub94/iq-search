import { ColorModeToggle } from "@/components/ColorToggle";
import DebugPanel from "@/components/DebugPanel";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import AnswerCard from "@/components/SearchElements/AnswerCard";
import { SearchInput } from "@/components/SearchElements/SearchInput";
import SearchLoading from "@/components/SearchElements/SearchLoading";
import { useDebugOptions } from "@/hooks/useDebugOptions";
import { logEvent } from "@/utils/googleAnalytics";
import { devLog, transformQuery } from "@/utils/text.utils";
import { trpc } from "@/utils/trpc";
import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  VStack,
  chakra,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const {
    isOpen: isDebugPanelOpen,
    onToggle: onDebugPanelToggle,
    onClose: onDebugPanelClose,
  } = useDisclosure();
  const [debugOptions, setDebugOptions] = useDebugOptions();

  const handleSearch = async (
    querySearchStr: string,
    route: boolean = true,
  ) => {
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
      options: debugOptions,
    });

    devLog(transformedQuery, chunks);
    setResult({ answer, wikiId, query: querySearchStr, wikiTitle });
    setLoading(false);

    if (route) {
      router.push(
        {
          pathname: "/",
          query: `query=${querySearchStr}`,
        },
        undefined,
        { shallow: true },
      );
    }
  };

  useEffect(() => {
    if (searchQuery.length === 0 || searchQuery.slice(1) === "") return;
    handleSearch(searchQuery, false);
  }, [searchQuery, handleSearch]);

  return (
    <>
      <DebugPanel
        isOpen={isDebugPanelOpen}
        onClose={onDebugPanelClose}
        debugOptions={debugOptions}
        setDebugOptions={setDebugOptions}
      />
      {inputQuery && (
        <NextSeo title={`${decodeURI(inputQuery)} - search on IQ GPT`} />
      )}
      <Flex direction='column' minH='100vh'>
        <Box w='full' textAlign='right' p='3' position='fixed'>
          <ColorModeToggle />
        </Box>
        <chakra.div flexGrow='1' display='flex' mt={{ md: "10" }}>
          <VStack gap={{ base: "10", md: "6" }} w='full' mt={{ base: "16" }}>
            <Header />
            <VStack w='full' px={{ base: "5", md: 0 }}>
              <HStack>
                <SearchInput
                  handleSearch={handleSearch}
                  query={decodeURI(inputQuery)}
                />
                <IconButton
                  variant="solid"
                  aria-label='Debug Panel'
                  onClick={onDebugPanelToggle}
                  icon={<SettingsIcon />}
                />
              </HStack>
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
