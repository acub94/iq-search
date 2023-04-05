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
  Spinner,
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

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [chunks, setChunks] = useState<PGChunk[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resultId, setResultId] = useState("");
  const toast = useToast();

  const handleAnswer = async () => {
    if (query.length == 0) {
      toast({
        title: "Please enter a valid text before searching",
        isClosable: true,
        status: "error",
      });
      return;
    }
    setLoading(true);
    setAnswer("");

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
    setChunks(results);
    setResultId(results[0].wikiid);

    console.log(results)

    const prompt = endent`
    Use the following passage to answer the query(dont write any questions in output): ${query}\n

    ${results
      .map((chunk) => {
        return chunk.content;
      })
      .join("")
      }
    `;

    console.log(prompt)

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
    if (event.key === "Enter" && query.length > 0) {
      await handleAnswer();
    } else if (event.key === "Enter" && query.length == 0) {
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
      <chakra.div minH="84vh">
        <Box w="full" textAlign="right" p="3" position="fixed">
          <ColorModeToggle />
        </Box>
        <VStack gap="6" w="full" mt={{ base: "8", lg: "12" }}>
          <Image
            src="./brainLogo.svg"
            w={{ base: "100px", md: "120px", lg: "140px", xl: "160px" }}
          />
          <Heading fontSize={{ lg: "35px", md: "2xl", base: "xl" }}>
            IQ GPT
          </Heading>

          <Flex
            w={{ base: "60%", lg: "500px" }}
            gap="2"
            border="gray.800"
            borderWidth="2px"
            rounded="lg"
            pl="2"
          >
            <Input
              placeholder="Ask me anything Crypto"
              _placeholderShown={{
                textOverflow: "ellipsis",
              }}
              fontSize="16"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              variant="unstyled"
              onKeyDown={handleKeyPress}
            />
            <Button
              onClick={handleAnswer}
              bg="none"
              px="3"
              // disabled={query.length > 1}
              _hover={{ bg: "none", color: "gray.500" }}
            >
              <Icon as={Search2Icon} />
            </Button>
          </Flex>
        </VStack>

        {loading ? (
          <VStack py="16">
            <Lottie animationData={loadingSrc} style={style} />
          </VStack>
        ) : (
          <VStack
            w="full"
            justifyContent="center"
            alignItems="center"
            py="8"
            gap="3"
          >
            {answer.length < 1 ? (
              <VStack py="20"></VStack>
            ) : (
              <ResultCard
                result={answer}
                resultLink={`https://iq.wiki/wiki/${resultId}`}
              />
            )}
          </VStack>
        )}
      </chakra.div>
      <Footer />
    </Flex>
  );
}
