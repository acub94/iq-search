import { Flex, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <Link href='/'>
      <Flex justifyContent='center'>
        <Image
          src='./brainLogo.svg'
          w={{ base: "100px" }}
          alt='Braindao GPT logo'
        />
      </Flex>
      <Heading
        fontSize={{ xl: "36px", md: "30px", base: "24px" }}
        pt='4'
        textAlign='center'
        _hover={{ textDecoration: "none" }}
      >
        IQ GPT
      </Heading>
    </Link>
  );
};

export default Header;
