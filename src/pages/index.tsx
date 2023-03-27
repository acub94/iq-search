import Footer from "@/components/Footer";
import { PGChunk } from "@/types";
import { BraindaoLogo } from "@/components/Icons/BraindaoLogo";
import {
  Box,
  Flex,
  Heading,
  Input,
  VStack,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { ColorModeToggle } from "@/components/ColorToggle";
import ResultCard from "@/components/ResultCard";
import { useState } from "react";
import endent from "endent";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [chunks, setChunks] = useState<PGChunk[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resultId, setResultId] = useState("");

  const handleAnswer = async () => {
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
    setResultId(results[0].id);

    const prompt = endent`
    Use the following passages to answer the query: ${query}

    ${results.map((chunk) => chunk.content).join("\n")}
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

  return (
    <Flex direction="column" minH="100vh">
      <Box w="full" textAlign="right" p="3" position="fixed">
        <ColorModeToggle />
      </Box>
      <VStack gap="7" w="full" mt={{ base: "8", lg: "12" }}>
        <BraindaoLogo />
        <Heading>IQ Search Engine</Heading>

        <Flex maxW={{ base: "60%", lg: "500px" }}>
          <Input
            placeholder="Ask me anything Crypto"
            _placeholderShown={{
              textOverflow: "ellipsis",
            }}
            fontSize="16"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={handleAnswer} bg="transparent">
            <Search2Icon color="gray.300" />
          </Button>
        </Flex>
      </VStack>

      {loading && (
        <VStack py="36">
          <Spinner size="lg" />
        </VStack>
      )}
      {!loading && answer.length < 1 && <VStack py="28"></VStack>}
      {!loading && answer.length > 1 && (
        <VStack
          w="full"
          justifyContent="center"
          alignItems="center"
          pt="8"
          pb="12"
          gap="3"
        >
          <ResultCard
            result={answer}
            resultLink={`https://iq.wiki/wiki/${resultId}`}
          />
        </VStack>
      )}
      <Footer />
    </Flex>
  );
}
