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

export default function Home() {
  return (
    <Flex direction="column" minH="100vh">
      <Box w="full" textAlign="right" p="3">
        <ColorModeToggle />
      </Box>
      <VStack gap="10" w="full" mt={{ base: "5", lg: "7" }}>
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
      <Footer />
    </Flex>
  );
}
