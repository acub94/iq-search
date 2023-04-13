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
  const wikiLink = `https://iq.wiki/wiki/${result.wikiId}`;
  const shareLink = `https://search.iq.wiki/?query=${result.query}`;

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
      mb='5'
    >
      <Box w='full'>
        <Text fontSize={{ base: "14px", lg: "16px" }} whiteSpace='pre-wrap'>
          {result.answer}
        </Text>
        {result.wikiId && (
          <Box
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
              href={wikiLink}
              target='_blank'
              textOverflow='hidden'
              color='brand.500'
              _hover={{ textDecor: "underline" }}
              _dark={{ color: "brand.800" }}
            >
              {wikiLink}
            </Link>
          </Box>
        )}
      </Box>
      <CardActions result={result} onShareOpen={onOpen} />
      <ShareModal
        result={result}
        isOpen={isOpen}
        onClose={onClose}
        shareLink={shareLink}
      />
    </VStack>
  );
};

export default AnswerCard;
