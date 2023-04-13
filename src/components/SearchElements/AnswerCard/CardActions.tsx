import { FeedbackType, useContentFeedback } from "@/hooks/useContentFeedback";
import { QueryResult } from "@/pages";
import { HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import {
  RiShareLine,
  RiThumbDownFill,
  RiThumbDownLine,
  RiThumbUpFill,
  RiThumbUpLine,
} from "react-icons/ri";

interface CardActionsProps {
  onShareOpen: () => void;
  result: QueryResult;
}

const CardActions = ({ onShareOpen, result }: CardActionsProps) => {
  const { mutateAsync } = useContentFeedback();
  const [feedbackAction, setFeedbackAction] = useState<"liked" | "disliked">();

  const handleLike = () => {
    mutateAsync({
      input: result.query,
      output: result.answer,
      feedback: FeedbackType.positive,
    });
    setFeedbackAction("liked");
  };

  const handleDislike = () => {
    mutateAsync({
      input: result.query,
      output: result.answer,
      feedback: FeedbackType.negative,
    });
    setFeedbackAction("disliked");
  };

  return (
    <HStack
      w='full'
      alignItems='center'
      textAlign='center'
      justifyContent='start'
      gap='2'
    >
      <Tooltip
        label='Share Link'
        fontSize='sm'
        rounded='md'
        bg='gray.800'
        color='whiteAlpha.900'
        _dark={{ bg: "whiteAlpha.900", color: "gray.800" }}
      >
        <IconButton
          variant='unstyled'
          aria-label='Share'
          onClick={onShareOpen}
          minW='initial'
          display='flex'
          h='6'
          w='6'
          alignItems='center'
          justifyContent='center'
          color='gray.500'
          _dark={{ color: "whiteAlpha.700" }}
        >
          <Icon as={RiShareLine} w='5' h='5' />
        </IconButton>
      </Tooltip>
      <Tooltip
        label='Like'
        fontSize='sm'
        rounded='md'
        bg='gray.800'
        color='whiteAlpha.900'
        _dark={{ bg: "whiteAlpha.900", color: "gray.800" }}
      >
        <IconButton
          variant='unstyled'
          aria-label='Share'
          minW='initial'
          display='flex'
          h='6'
          w='6'
          alignItems='center'
          justifyContent='center'
          color='gray.500'
          _dark={{ color: "whiteAlpha.700" }}
          onClick={() => {
            handleLike();
          }}
        >
          {feedbackAction === "liked" ? (
            <Icon as={RiThumbUpFill} w='5' h='5' />
          ) : (
            <Icon as={RiThumbUpLine} w='5' h='5' />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip
        label='DisLike'
        fontSize='sm'
        rounded='md'
        bg='gray.800'
        color='whiteAlpha.900'
        _dark={{ bg: "whiteAlpha.900", color: "gray.800" }}
      >
        <IconButton
          variant='unstyled'
          aria-label='Share'
          minW='initial'
          display='flex'
          h='6'
          w='6'
          alignItems='center'
          justifyContent='center'
          color='gray.500'
          _dark={{ color: "whiteAlpha.700" }}
          onClick={() => {
            handleDislike();
          }}
        >
          {feedbackAction === "disliked" ? (
            <Icon as={RiThumbDownFill} w='5' h='5' />
          ) : (
            <Icon as={RiThumbDownLine} w='5' h='5' />
          )}
        </IconButton>
      </Tooltip>
    </HStack>
  );
};

export default CardActions;
