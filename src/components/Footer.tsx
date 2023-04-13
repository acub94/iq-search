import {
  VStack,
  Text,
  Flex,
  HStack,
  Button,
  chakra,
  Link,
  Icon
} from '@chakra-ui/react';
import React from 'react';
import { Socials } from './Data/socialData';

const Footer = () => {
  const thisYear = new Date().getFullYear();
  return (
    <VStack
      w='full'
      borderTop='1px'
      borderTopColor='gray.200'
      spacing='3'
      alignItems='center'
      justifyContent='center'
      fontWeight='semibold'
      color='#1A202C'
      _dark={{
        color: 'white',
        borderTopColor: '#ffffff2d'
      }}
      py='5'
      bottom='0'
    >
      <Text
        color='gray.600'
        _dark={{
          color: 'gray.400'
        }}
      >
        Powered by{' '}
        <Link
          _hover={{
            color: 'gray.900',
            textDecor: 'underline',
            _dark: { color: 'whiteAlpha.900' }
          }}
          href='https://braindao.org'
        >
          Braindao
        </Link>
      </Text>
      <HStack w='full' alignItems='center' justifyContent='center'>
        {Socials.map((social) => (
          <Link
            target='_blank'
            href={social.href}
            _hover={{ textDecoration: 'none' }}
            key={social.href}
            color='gray.600'
            _dark={{
              color: 'gray.400'
            }}
          >
            <chakra.span srOnly>{social.href}</chakra.span>
            <Button size='xs' variant='social'>
              <chakra.span srOnly>{social.href}</chakra.span>
              <Icon
                as={social.icon}
                w={{ base: '5', lg: '6' }}
                h={{ base: '6', lg: '7' }}
                color='gray.600'
                _dark={{
                  color: 'gray.400'
                }}
                _hover={{ color: 'brand.500', _dark: { color: 'brand.800' } }}
              />
            </Button>
          </Link>
        ))}
      </HStack>

      <Flex
        alignItems='center'
        direction={{ base: 'column', md: 'initial' }}
        fontSize={{ base: '12px', lg: '14px' }}
      >
        <Text
          pr={2}
          color='gray.600'
          _dark={{
            color: 'gray.400'
          }}
        >
          ©{thisYear} Powered by
          <Link target='_blank' href='https://iq.wiki.com/'>
            <Text
              as='span'
              color='#ff5caa'
              px='1'
              _hover={{ textDecoration: 'underline' }}
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
