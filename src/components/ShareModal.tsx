import {
  ModalProps,
  useClipboard,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Box,
  Link,
  chakra,
  ModalHeader,
  Icon,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { RiFileCopyLine, RiFileCopyFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { Socials } from "./Data/socialData";

const ShareModal = ({
  onClose,
  isOpen = false,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const { hasCopied, onCopy } = useClipboard("This is the URL of the Response");
  if (!isOpen) return null;

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={{ base: "sm", md: "lg", lg: "xl" }}
    >
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: "gray.800",
        }}
        rounded="2xl"
      >
        <ModalHeader pt="4" pb="3">
          <Flex justifyContent="right">
            <Icon
              as={MdCancel}
              onClick={onClose}
              color="red.500"
              cursor="pointer"
              rounded="full"
            />
          </Flex>
        </ModalHeader>
        <ModalBody p="0">
          <Flex
            justify="space-between"
            direction="column"
            pb="5"
            gap="10"
            px={{ base: "4", md: "6", lg: "8" }}
          >
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              fontWeight="600"
            >
              Share this result
            </Text>
            <HStack
              w="full"
              alignItems="center"
              gap={{ base: "1", md: "5" }}
              justifyContent="center"
            >
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
              w="full"
              gap="2"
              alignItems="flex-start"
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
            >
              <chakra.span>Or copy link</chakra.span>
              <Flex
                w="full"
                borderColor="gray.100"
                borderWidth="1px"
                _dark={{ borderColor: "white" }}
                rounded="md"
                justifyContent="space-between"
                px="3"
                py="1"
              >
                <Link
                  whiteSpace="nowrap"
                  // href={router.asPath}
                  color="#2D3748"
                  _dark={{ color: "#b1b2b5" }}
                >
                  This is the URL of the Response
                </Link>
                <chakra.div onClick={onCopy} cursor="pointer" color="brand.800">
                  {!hasCopied ? "Copy" : "Copied"}
                </chakra.div>
              </Flex>
            </VStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
