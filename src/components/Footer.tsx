import {
  VStack,
  Text,
  Flex,
  HStack,
  Button,
  chakra,
  Link,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { Socials } from "./Data/socialData";

const Footer = () => {
  const thisYear = new Date().getFullYear();
  return (
    <VStack
      w="full"
      borderTop="1px"
      borderTopColor="gray.200"
      spacing="3"
      alignItems="center"
      justifyContent="center"
      fontWeight="semibold"
      color="#1A202C"
      py="2"
      position="absolute"
      bottom="0"
    >
      <Text>Powered by Braindao</Text>
      <HStack w="full" alignItems="center" justifyContent="center">
        {Socials.map((social) => (
          <Link
            target="_blank"
            href={social.href}
            _hover={{ textDecoration: "none" }}
            key={social.href}
          >
            <chakra.span srOnly>{social.href}</chakra.span>
            <Button size="sm" variant="social">
              <chakra.span srOnly>{social.href}</chakra.span>
              <Icon as={social.icon} w={7} h={8} />
            </Button>
          </Link>
        ))}
      </HStack>

      <Flex alignItems="center" direction={{ base: "column", md: "initial" }}>
        <Text pr={2}>
          ©{thisYear}
          <Link target="_blank" href="https://iq.wiki.com/">
            <Text
              as="span"
              color="#ff5caa"
              px="1"
              _hover={{ textDecoration: "underline" }}
            >
              IQ.Wiki
            </Text>
          </Link>
          All Rights Reserved.
        </Text>
      </Flex>
    </VStack>
  );
};

export default Footer;
