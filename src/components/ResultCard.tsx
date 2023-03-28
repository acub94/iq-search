import {
  VStack,
  Text,
  Link,
  chakra,
  Box,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { ResultIcons, Socials } from "./Data/socialData";

const ResultCard = ({
  result,
  resultLink,
}: {
  result: string;
  resultLink: string;
}) => {
  return (
    <VStack
      p="3"
      bg="gray.200"
      _dark={{ bg: "gray.700" }}
      gap="4"
      w={{ base: "80%", md: "70%", lg: "50%" }}
      rounded="md"
    >
      <Box w="full">
        <Text fontSize={{ base: "12px", lg: "14px" }}>{result}</Text>
        <chakra.div pt="8">
          Source: <Link
            href={resultLink}
            color="#FF5CAA"
            _dark={{ color: "#FF1A88" }}
            target="_blank"
          >
            <Text>{resultLink}</Text>
          </Link>
        </chakra.div>
      </Box>
      <HStack w="full" alignItems="center" justifyContent="start" gap="4">
        {ResultIcons.map((item, i) => (
          <Icon
            key={i}
            cursor="pointer"
            as={item.icon}
            w={{ base: "5", lg: "6" }}
            h={{ base: "6", lg: "7" }}
          />
        ))}
      </HStack>
    </VStack>
  );
};

export default ResultCard;
