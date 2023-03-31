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
        <Flex pt="4" gap="1">
          Source:
          <Link
            href={resultLink}
            color="#FF5CAA"
            _dark={{ color: "#FF1A88" }}
            target="_blank"
          >
            <Text>{resultLink}</Text>
          </Link>
        </Flex>
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
        <Tooltip label="Like" fontSize="sm" rounded="md">
          <chakra.div onClick={LikeHandler} pt="4px">
            <Lottie
              options={defaultOptionsLike}
              style={{
                marginLeft: "-17px",
              }}
              height={50}
              width={50}
              isStopped={isStoppedLike}
              isPaused={isPausedLike}
              speed={speedLike}
              direction={directionLike}
            />
          </chakra.div>
        </Tooltip>
        <Tooltip label="Dislike" fontSize="sm" rounded="md">
          <chakra.div onClick={clickHandler} pt="6px">
            <Lottie
              options={defaultOptions}
              style={{
                transform: "rotate(180deg)",
                marginLeft: "-22px",
              }}
              height={50}
              width={50}
              isStopped={isStopped}
              isPaused={isPaused}
              speed={speed}
              direction={direction}
            />
          </chakra.div>
        </Tooltip>
      </HStack>
      <ShareModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default ResultCard;
