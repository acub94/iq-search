import {
  VStack,
  Text,
  Link,
  chakra,
  Box,
  HStack,
  Button,
  Icon,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Like from "./Data/Like.json";
import Share from "./Data/share.json";
import Lottie from "react-lottie";

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
  const [isLike, setIsLike] = useState(false);

  const [isStoppedShare, setIsStoppedShare] = useState(true);
  const [isPausedShare, setIsPausedShare] = useState(false);
  const [speedShare, setSpeedShare] = useState(2);
  const [directionShare, setDirectionShare] = useState(1);
  const [isLikeShare, setIsLikeShare] = useState(false);

  const clickHandler = () => {
    if (!isStopped) {
      setDirection(direction * -1);
    }
    setIsStopped(false);
    setIsLike(!isLike);
  };

  const ShareHandler = () => {
    if (!isStoppedShare) {
      setDirectionShare(directionShare * -1);
    }
    setIsStoppedShare(false);
    setIsLikeShare(!isLikeShare);
  };

  return (
    <VStack
      p="3"
      bg="gray.200"
      _dark={{ bg: "gray.700" }}
      gap="1"
      w={{ base: "80%", md: "80%", lg: "60%" }}
      rounded="md"
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
      <HStack w="full" alignItems="center" justifyContent="start">
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
          <chakra.div onClick={clickHandler}>
            <Lottie
              options={defaultOptions}
              height={55}
              width={40}
              isStopped={isStopped}
              isPaused={isPaused}
              speed={speed}
              direction={direction}
            />
          </chakra.div>
        </Tooltip>
      </HStack>
    </VStack>
  );
};

export default ResultCard;
