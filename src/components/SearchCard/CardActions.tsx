import { HStack, Tooltip, IconButton, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import {
  RiShareLine,
  RiThumbUpFill,
  RiThumbUpLine,
  RiThumbDownFill,
  RiThumbDownLine
} from 'react-icons/ri';

const CardActions = ({ ShareHandler }: { ShareHandler: () => void }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [disLiked, setDisliked] = useState<boolean>(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleDislike = () => {
    setDisliked(!disLiked);
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
        _dark={{ bg: 'whiteAlpha.900', color: 'gray.800' }}
      >
        <IconButton
          variant='unstyled'
          aria-label='Share'
          onClick={ShareHandler}
          minW='initial'
          display='flex'
          h='6'
          w='6'
          alignItems='center'
          justifyContent='center'
          color='gray.500'
          _dark={{ color: 'whiteAlpha.700' }}
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
        _dark={{ bg: 'whiteAlpha.900', color: 'gray.800' }}
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
          _dark={{ color: 'whiteAlpha.700' }}
          onClick={() => {
            handleLike();
          }}
        >
          {liked ? (
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
        _dark={{ bg: 'whiteAlpha.900', color: 'gray.800' }}
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
          _dark={{ color: 'whiteAlpha.700' }}
          onClick={() => {
            handleDislike();
          }}
        >
          {disLiked ? (
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
