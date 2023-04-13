import { QueryResult } from "@/pages";
import { CloseIcon } from "@chakra-ui/icons";
import {
  useClipboard,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Link,
  chakra,
  ModalHeader,
  Icon,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Socials } from "./Data/socialData";

interface ShareModalProps {
  onClose: () => void;
  isOpen: boolean;
  shareLink: string;
  result: QueryResult;
}

const ShareModal = ({
  onClose,
  isOpen = false,
  shareLink,
  result,
}: ShareModalProps) => {
  const { hasCopied, onCopy } = useClipboard(
    `https://search.iq.qiki/?query=${result.query}`,
  );
  if (!isOpen) return null;

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={{ base: "sm", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: "gray.800",
        }}
        rounded='2xl'
      >
        <ModalHeader pt='6' pb='3'>
          <Flex justifyContent='right'>
            <Flex
              w='20px'
              h='20px'
              bgColor='red.500'
              alignItems='center'
              justifyContent='center'
              borderRadius='50%'
              color='white'
            >
              <Icon
                as={CloseIcon}
                onClick={onClose}
                cursor='pointer'
                rounded='full'
                w='12px'
                h='12px'
              />
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalBody pt='0' pb='6' px='6'>
          <Flex justify='space-between' direction='column' pb='6' gap='10'>
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              fontWeight='600'
            >
              Share this result
            </Text>
            <HStack
              w='full'
              alignItems='center'
              gap={{ base: "1", md: "5" }}
              justifyContent='center'
            >
              {Socials.map((social) => (
                <Link
                  target='_blank'
                  href={social.href}
                  _hover={{ textDecoration: "none" }}
                  key={social.href}
                >
                  <chakra.span srOnly>{social.href}</chakra.span>
                  <Button size='xs' variant='social'>
                    <chakra.span srOnly>{social.href}</chakra.span>
                    <Icon
                      as={social.icon}
                      w={{ base: "6", lg: "8" }}
                      h={{ base: "7", lg: "9" }}
                      _hover={{
                        color: "brand.500",
                        _dark: { color: "brand.800" },
                      }}
                    />
                  </Button>
                </Link>
              ))}
            </HStack>
            <VStack
              w='full'
              gap='2'
              alignItems='flex-start'
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
            >
              <chakra.span color='gray.600' _dark={{ color: "whiteAlpha.700" }}>
                Or copy link
              </chakra.span>
              <Flex
                w='full'
                borderColor='gray.100'
                borderWidth='1px'
                _dark={{ borderColor: "#FFFFFF3D" }}
                rounded='md'
                justifyContent='space-between'
                px='3'
                py='1'
                alignItems='center'
                gap='2'
              >
                <Link
                  whiteSpace='nowrap'
                  color='#2D3748'
                  _dark={{ color: "#b1b2b5" }}
                  noOfLines={1}
                  fontSize={{ base: "12px", lg: "14px" }}
                  overflow='hidden'
                  display='inline'
                  textOverflow='ellipsis'
                >
                  {shareLink}
                </Link>
                <Button
                  onClick={onCopy}
                  variant='unstyled'
                  color='brand.500'
                  _dark={{ color: "brand.800" }}
                  h='initial'
                  w='max-content'
                  fontSize={{ base: "12px", lg: "14px" }}
                >
                  {!hasCopied ? "Copy" : "Copied"}
                </Button>
              </Flex>
            </VStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
