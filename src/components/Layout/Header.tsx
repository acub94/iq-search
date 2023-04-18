import { useI18n } from "@/locales";
import { Flex, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const t = useI18n();
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
        fontSize={{ base: "28px", md: "30px", xl: "36px" }}
        pt='4'
        textAlign='center'
        _hover={{ textDecoration: "none" }}
      >
        {t("headerTitle")}
      </Heading>
    </Link>
  );
};

export default Header;
