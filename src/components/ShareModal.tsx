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
  ModalHeader,
  chakra,
} from "@chakra-ui/react";
import { RiFileCopyLine, RiFileCopyFill } from "react-icons/ri";

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
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: "gray.800",
        }}
      >
        <ModalBody p="0">
          <Flex
            justify="space-between"
            align="center"
            border="2px solid"
            borderColor="tetiaryGray"
            p="1rem"
            borderRadius="0.4rem"
          >
            <Text color="brand.600" cursor="pointer">
              Share Link
            </Text>
            <Box
              overflowX="hidden"
              w="80%"
              p="0.5rem"
              bg="brand.150"
              _dark={{ bg: "#232934" }}
              rounded="md"
            >
              <Link
                whiteSpace="nowrap"
                // href={router.asPath}
                color="#2D3748"
                _dark={{ color: "#b1b2b5" }}
              >
                This is the URL of the Response
              </Link>
            </Box>
            <chakra.div onClick={onCopy}>
              {!hasCopied ? <RiFileCopyLine /> : <RiFileCopyFill />}
            </chakra.div>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
