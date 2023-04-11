import {
  VStack,
  Text,
  Link,
  chakra,
  Box,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { shortenText } from "@/utils/shortenText";
import { Inconsolata } from "next/font/google";
import CardActions from "./CardActions";
import ShareModal from "../ShareModal";

const inconsolata = Inconsolata({
  subsets: ["latin"],
});

const SearchCard = ({
  result,
  resultLink,
}: {
  result: string;
  resultLink: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ShareHandler = () => {
    onOpen();
  };

  return (
    <VStack
      p={{ base: 3, md: "5" }}
      bg='gray.50'
      borderColor='gray.200'
      borderWidth='1px'
      _dark={{
        bg: "gray.700",
        borderColor: "#ffffff3d",
      }}
      gap='1'
      w={{ base: "100%", md: "80%", xl: "60%" }}
      rounded='2xl'
    >
      <Box w='full'>
        <Text fontSize={{ base: "14px", lg: "16px" }} whiteSpace='pre-wrap'>
          {result}
        </Text>
        <VStack
          pt='7'
          w='full'
          alignItems='flex-start'
          fontFamily={inconsolata.style.fontFamily}
        >
          <Flex w='full' pb='0'>
            Source: <Text pl='2'>{shortenText(result, 70)}</Text>
          </Flex>
          <chakra.span>
            <Link
              href={resultLink}
              target='_blank'
              textOverflow='hidden'
              color='brand.500'
              _hover={{ textDecor: "underline" }}
              _dark={{ color: "brand.800" }}
            >
              {resultLink}
            </Link>
          </chakra.span>
        </VStack>
      </Box>
      <CardActions ShareHandler={ShareHandler} />
      <ShareModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default SearchCard;
