import { VStack, Text, Link, Box, useDisclosure, Flex } from "@chakra-ui/react";
import React from "react";
import { shortenText } from "@/utils/text.utils";
import { Inconsolata } from "next/font/google";
import CardActions from "./CardActions";
import ShareModal from "../../ShareModal";
import { QueryResult } from "@/pages";

const inconsolata = Inconsolata({
  subsets: ["latin"],
});

interface AnswerCardProps {
  result: QueryResult;
}

const AnswerCard = ({ result }: AnswerCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          {result.answer}
        </Text>
        {result.wikiId && (
          <Text
            mt='0'
            pt='7'
            w='full'
            alignItems='flex-start'
            fontFamily={inconsolata.style.fontFamily}
          >
            <Flex w='full' pb='0' as='span'>
              Source: <Text pl='2'>{shortenText(result.wikiTitle, 70)}</Text>
            </Flex>
            <Link
              mt='-5px'
              href={`https://iq.wiki/wiki/${result.wikiId}`}
              target='_blank'
              textOverflow='hidden'
              color='brand.500'
              _hover={{ textDecor: "underline" }}
              _dark={{ color: "brand.800" }}
            >
              https://iq.wiki/wiki/{result.wikiId}
            </Link>
          </Text>
        )}
      </Box>
      <CardActions result={result} onShareOpen={onOpen} />
      <ShareModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default AnswerCard;
