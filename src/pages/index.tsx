import Footer from "@/components/Footer";
import { PGChunk } from "@/types";
import Lottie from "lottie-react";
import {
  Box,
  Flex,
  Heading,
  Input,
  VStack,
  Button,
  Icon,
  chakra,
  useToast,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { ColorModeToggle } from "@/components/ColorToggle";
import ResultCard from "@/components/ResultCard";
import { useState } from "react";
import endent from "endent";
import FilterDark from "../components/Data/filterDark.json";
import FilterLight from "../components/Data/filterLight.json";
import Link from "next/link";
import { queryReadyText } from "@/utils/shortenText";

export default function Home() {
  const [queryText, setQueryText] = useState<string>("");
  const [chunks, setChunks] = useState<PGChunk[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resultId, setResultId] = useState("");
  const toast = useToast();

  const handleAnswer = async () => {
    if (queryText.length == 0) {
      toast({
        title: "Please enter a valid text before searching",
        isClosable: true,
        status: "error",
      });
      return;
    }
    setLoading(true);
    setAnswer("");
    let query = queryReadyText(queryText);
    const searchResponse = await fetch("/api/prompt-embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!searchResponse.ok) {
      setLoading(false);
      return;
    }

    const results: PGChunk[] = await searchResponse.json();
    if (results.length < 1) {
      setLoading(false);
      toast({
        title: "Search query can't be found in any wiki",
        isClosable: true,
        status: "warning",
      });
      return;
    }
    setChunks(results);
    setResultId(results[0].wikiid);

    const prompt = endent`
    Use the following passage to answer the query(dont write any questions in output): ${queryText}\n

    ${results
      .map((chunk) => {
        return chunk.content;
      })
      .join("")}
    `;

    const answerResponse = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!answerResponse.ok) {
      setLoading(false);
      return;
    }

    const data = answerResponse.body;

    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkvalue = decoder.decode(value);
      setAnswer((prev) => prev + chunkvalue);
    }

    setLoading(false);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && queryText.length > 0) {
      await handleAnswer();
    } else if (event.key === "Enter" && queryText.length == 0) {
      toast({
        title: "Please enter a valid text before searching",
        isClosable: true,
        status: "error",
      });
    }
  };

  const style = {
    height: 100,
    cursor: "pointer",
  };

  const loadingSrc = useColorModeValue(FilterDark, FilterLight);

  return (
    <Flex direction="column">
      <Box w="full" textAlign="right" p="3" position="fixed">
        <ColorModeToggle />
      </Box>
      <chakra.div
        minH="87vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <VStack
          gap={{ base: "10", md: "6" }}
          w="full"
          mt={{ base: "16", lg: "12" }}
        >
          <Link href="/">
            <Image
              src="./brainLogo.svg"
              w={{ base: "180px", lg: "170px", xl: "160px" }}
            />
            <Heading
              fontSize={{ lg: "35px", md: "3xl", base: "3xl" }}
              pt="4"
              textAlign="center"
              _hover={{ textDecoration: "none" }}
            >
              IQ GPT
            </Heading>
          </Link>
          <VStack w="full">
            <Flex
              w={{ base: "80%", lg: "70%" }}
              gap="2"
              h="14"
              borderColor="gray.200"
              _dark={{
                borderColor: "#ffffff3d",
                bg: "gray.700",
                color: "#ffffffa3",
              }}
              bg="white"
              borderWidth="1px"
              rounded="lg"
              pl="2"
              alignItems="center"
            >
              <Input
                placeholder="Ask me anything Crypto"
                _placeholderShown={{
                  textOverflow: "ellipsis",
                }}
                fontSize="16"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                variant="unstyled"
                onKeyDown={handleKeyPress}
                h="full"
              />
              <Button
                onClick={handleAnswer}
                bg="none"
                px="3"
                _hover={{ bg: "none", color: "gray.500" }}
              >
                <Icon as={Search2Icon} />
              </Button>
            </Flex>

            {loading ? (
              <VStack py={{ base: "5", lg: "14" }}>
                <Lottie animationData={loadingSrc} style={style} />
              </VStack>
            ) : (
              <VStack
                w="full"
                justifyContent="center"
                alignItems="center"
                pt="4"
                pb="6"
                gap="3"
              >
                {answer.length > 0 && (
                  <ResultCard
                    result={answer}
                    resultLink={`https://iq.wiki/wiki/${resultId}`}
                  />
                )}
              </VStack>
            )}
          </VStack>
        </VStack>
      </chakra.div>
      <Footer />
    </Flex>
  );
}
