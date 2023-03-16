import Footer from "@/components/Footer";
import { BraindaoLogo } from "@/components/Icons/BraindaoLogo";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { ColorModeToggle } from "@/components/ColorToggle";
import ResultCard from "@/components/ResultCard";

export default function Home() {
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
          />
        </InputGroup>
      </VStack>
      <VStack
        w="full"
        justifyContent="center"
        alignItems="center"
        py="4"
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
