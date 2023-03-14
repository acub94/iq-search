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
      <VStack gap="10" w="full" mt="10">
        <BraindaoLogo />
        <Heading>IQ Search Engine</Heading>
        <InputGroup
          size="lg"
          maxW="500px"
          display={{ base: "none", md: "block" }}
        >
          <InputRightElement
            ml={{ base: "15px", xl: "unset" }}
            pointerEvents="none"
            h="full"
          >
            <Search2Icon color="gray.300" />
          </InputRightElement>
          <Input
            ml={{ base: "15px", xl: "unset" }}
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
