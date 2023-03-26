import Footer from "@/components/Footer";
import { PGChunk } from "@/types";
import { BraindaoLogo } from "@/components/Icons/BraindaoLogo";
import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { ColorModeToggle } from "@/components/ColorToggle";
import ResultCard from "@/components/ResultCard";
import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import endent from "endent";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState<string>("");
  const [chunks, setChunks] = useState<PGChunk[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAnswer = async () => {
    setLoading(true);

    const searchResponse = await fetch("/api/prompt-embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    if (!searchResponse.ok) {
      setLoading(false);
      return;
    }

    const results: PGChunk[] = await searchResponse.json();
    setChunks(results);
  
    const prompt = endent`
    Use the following passages to answer the query: ${query}

    ${results.map((chunk) => chunk.content).join("\n")}
    `;

    console.log(prompt);

    const answerResponse = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if(!answerResponse.ok) {
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
      const {value, done: doneReading} = await reader.read();
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
      <VStack gap="10" w="full" mt={{ base: "8", lg: "12" }}>
        <BraindaoLogo />
        <Heading>IQ Search Engine</Heading>
        <InputGroup
          size={{ base: "md", lg: "lg" }}
          maxW={{ base: "60%", lg: "500px" }}
        >
          <InputRightElement mr="15px" pointerEvents="none" h="full">
            <Search2Icon color="gray.300" />
          </InputRightElement>
          <Input
            placeholder="Ask me anything Crypto"
            _placeholderShown={{
              textOverflow: "ellipsis",
            }}
            fontSize="16"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
        <button
          className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-blue-500 p-1 hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10 text-white"
          onClick={handleAnswer}
          >
          Submit
        </button>
      </VStack>
      <VStack spacing={4} mt={4}>
        {
          loading
          ? <Box><Text>Loading...</Text></Box>
          : <Box>
            {answer}
          </Box>
        }
      </VStack>
      <VStack
        w="full"
        justifyContent="center"
        alignItems="center"
        pt="6"
        pb="12"
        gap="3"
      >
        <ResultCard
          result={`Popularity can be subjective and can be influenced by various factors such as recent achievements and media coverage. Cristiano Ronaldo and Neymar are also named as very popular footballers in the world in a Morning Consult data from December 2022. Additionally, previous lists such as The Guardian's list of the world's top 100 footballers from 2012 [1], and other sources recognize famous past and present footballers including Ronaldo Nazario, Zinedine Zidane, Alfredo Di Stefano, Michel Platini, Johan Cruyff, and Garrincha. It is hard to determine definitively who is the most famous footballer as opinions may vary based on individual preferences and cultural backgrounds.`}
          resultLink="https://www.theguardian.com/football/datablog/2012/dec/24/world-best-footballers-top-100-list"
          urlTitle={`The world's best footballers: the top 100 list | Football | theguardian`}
        />

        <ResultCard
          result={`Popularity can be subjective and can be influenced by various factors such as recent achievements and media coverage. Cristiano Ronaldo and Neymar are also named as very popular footballers in the world in a Morning Consult data from December 2022. Additionally, previous lists such as The Guardian's list of the world's top 100 footballers from 2012 [1], and other sources recognize famous past and present footballers including Ronaldo Nazario, Zinedine Zidane, Alfredo Di Stefano, Michel Platini, Johan Cruyff, and Garrincha. It is hard to determine definitively who is the most famous footballer as opinions may vary based on individual preferences and cultural backgrounds.`}
          resultLink="https://www.theguardian.com/football/datablog/2012/dec/24/world-best-footballers-top-100-list"
          urlTitle={`The world's best footballers: the top 100 list | Football | theguardian`}
        />
      </VStack>

      <Footer />
    </Flex>
  );
}
