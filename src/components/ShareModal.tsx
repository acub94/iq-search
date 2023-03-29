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
} from "@chakra-ui/react";

const ShareModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const { hasCopied, onCopy } = useClipboard("url");
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl" {...rest}>
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: "gray.800",
        }}
      >
        <ModalBody py="3rem" px="2rem">
          <Flex
            justify="space-between"
            align="center"
            border="2px solid"
            borderColor="tetiaryGray"
            p="1rem"
            borderRadius="0.4rem"
          >
            <Text onClick={onCopy} color="brand.600" cursor="pointer">
              {hasCopied ? "Copied!" : "Copy url"}
            </Text>
            <Box
              overflowX="hidden"
              w="80%"
              p="0.5rem"
              bg="brand.150"
              _dark={{ bg: "#232934" }}
            >
              <Link
                whiteSpace="nowrap"
                // href={router.asPath}
                color="#2D3748"
                _dark={{ color: "#b1b2b5" }}
              >
                {"url"}
              </Link>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
