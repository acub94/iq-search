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
      borderTopColor="gray.400"
      spacing="3"
      alignItems="center"
      justifyContent="center"
      fontWeight="semibold"
      color="#1A202C"
      _dark={{ color: "white", borderTopColor: "#ffffff3d" }}
      py="3"
      bottom="0"
    >
      <HStack w="full" alignItems="center" justifyContent="center">
        {Socials.map((social) => (
          <Link
            target="_blank"
            href={social.href}
            _hover={{ textDecoration: "none" }}
            key={social.href}
          >
            <chakra.span srOnly>{social.href}</chakra.span>
            <Button size="xs" variant="social">
              <chakra.span srOnly>{social.href}</chakra.span>
              <Icon
                as={social.icon}
                w={{ base: "5", lg: "6" }}
                h={{ base: "6", lg: "7" }}
                _hover={{ color: "brand.500", _dark: { color: "brand.800" } }}
              />
            </Button>
          </Link>
        ))}
      </HStack>

      <Flex
        alignItems="center"
        direction={{ base: "column", md: "initial" }}
        fontSize={{ base: "12px", lg: "14px" }}
      >
        <Text pr={2}>
          ©{thisYear} Powered by
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
