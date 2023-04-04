import {
  VStack,
  Text,
  Link,
  chakra,
  Box,
  HStack,
  Flex,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Like from "./Data/Like.json";
import Dislike from "./Data/DisLike.json";
import Share from "./Data/share.json";
import Lottie from "react-lottie";
import ShareModal from "./ShareModal";
import { shortenText } from "@/utils/shortenText";
import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({
  subsets: ["latin"],
});

const ResultCard = ({
  result,
  resultLink,
}: {
  result: string;
  resultLink: string;
}) => {
  const style = {
    height: 55,
    cursor: "pointer",
  };

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: Dislike,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsLike = {
    loop: false,
    autoplay: false,
    animationData: Like,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsShare = {
    loop: false,
    autoplay: false,
    animationData: Share,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [isStopped, setIsStopped] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [direction, setDirection] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isStoppedShare, setIsStoppedShare] = useState(true);
  const [isPausedShare, setIsPausedShare] = useState(false);
  const [speedShare, setSpeedShare] = useState(2);
  const [directionShare, setDirectionShare] = useState(1);

  const [isStoppedLike, setIsStoppedLike] = useState(true);
  const [isPausedLike, setIsPausedLike] = useState(false);
  const [speedLike, setSpeedLike] = useState(2);
  const [directionLike, setDirectionLike] = useState(1);

  const clickHandler = () => {
    if (!isStopped) {
      setDirection(direction * -1);
    }
    setIsStopped(false);
  };

  const LikeHandler = () => {
    if (!isStoppedLike) {
      setDirectionLike(directionLike * -1);
    }
    setIsStoppedLike(false);
  };

  const ShareHandler = () => {
    if (!isStoppedShare) {
      setDirectionShare(directionShare * -1);
    }
    setIsStoppedShare(false);
    onOpen();
  };

  return (
    <VStack
      px="6"
      pt="5"
      pb="1"
      bg="gray.50"
      _dark={{ bg: "gray.700" }}
      gap="1"
      w={{ base: "80%", md: "80%", lg: "60%" }}
      rounded="2xl"
    >
      <Box w="full">
        <Text fontSize={{ base: "14px", lg: "16px" }} whiteSpace="pre-wrap">
          {result}
        </Text>
        <VStack
          pt="7"
          w="full"
          alignItems="flex-start"
          fontFamily={inconsolata.style.fontFamily}
        >
          <Flex w="full" pb="0">
            Source:
            <Link
              href={resultLink}
              color="brand.500"
              _dark={{ color: "brand.800" }}
              target="_blank"
              textOverflow="hidden"
              pl="2"
            >
              <Text>{shortenText(result, 70)}</Text>
            </Link>{" "}
          </Flex>
          <chakra.span color="gray.500" _dark={{ color: "whiteAlpha.600" }}>
            {resultLink}
          </chakra.span>
        </VStack>
      </Box>
      <HStack
        w="full"
        alignItems="center"
        textAlign="center"
        justifyContent="start"
      >
        <Tooltip label="Share Link" fontSize="sm" rounded="md">
          <chakra.div onClick={ShareHandler}>
            <Lottie
              options={defaultOptionsShare}
              height={30}
              width={30}
              isStopped={isStoppedShare}
              isPaused={isPausedShare}
              speed={speedShare}
              direction={directionShare}
            />
          </chakra.div>
        </Tooltip>

        <chakra.div pos="relative" cursor="pointer">
          <Lottie
            options={defaultOptionsLike}
            style={{
              marginLeft: "-13px",
            }}
            height={50}
            width={50}
            isStopped={isStoppedLike}
            isPaused={isPausedLike}
            speed={speedLike}
            direction={directionLike}
          />
          <Tooltip label="Like" fontSize="sm" rounded="md">
            <chakra.div
              onClick={LikeHandler}
              pos="absolute"
              top="30%"
              left="3%"
              w="18px"
              h="20px"
            />
          </Tooltip>
        </chakra.div>

        <chakra.div pos="relative" cursor="pointer">
          <Lottie
            options={defaultOptions}
            style={{
              transform: "rotate(180deg)",
              marginLeft: "-24px",
            }}
            height={50}
            width={50}
            isStopped={isStopped}
            isPaused={isPaused}
            speed={speed}
            direction={direction}
          />
          <Tooltip label="Dislike" fontSize="sm" rounded="md">
            <chakra.div
              onClick={clickHandler}
              pos="absolute"
              top="30%"
              left="-25%"
              w="18px"
              h="20px"
            />
          </Tooltip>
        </chakra.div>
      </HStack>
      <ShareModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default ResultCard;
