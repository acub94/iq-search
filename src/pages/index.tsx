import Footer from '@/components/Footer';
import { PGChunk } from '@/types';
import Lottie from 'lottie-react';
import {
  Box,
  Flex,
  Heading,
  Input,
  VStack,
  Button,
  Icon,
  chakra,
  useToast,
  Image,
  useColorModeValue
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { ColorModeToggle } from '@/components/ColorToggle';
import { useEffect, useState } from 'react';
import endent from 'endent';
import FilterDark from '../components/Data/filterDark.json';
import FilterLight from '../components/Data/filterLight.json';
import Link from 'next/link';
import { queryReadyText } from '@/utils/shortenText';
import SearchCard from '@/components/SearchCard';
import { logEvent } from '@/utils/googleAnalytics';
import { useRouter } from 'next/router';

export default function Home() {
  const [queryText, setQueryText] = useState<string>('');
  const [, setChunks] = useState<PGChunk[]>([]);
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [resultId, setResultId] = useState('');
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const updateUrl = () => {
      const queryParam = new URLSearchParams({
        query: queryReadyText(queryText)
      });
      const url = new URL(window.location.pathname, window.location.origin);
      url.search = queryParam.toString();
      window.history.pushState({}, '', url.toString());
    };

    if (queryText) {
      updateUrl();
    } else {
      router.push('/', undefined, { shallow: true });
    }
  }, [queryText, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryText(e.target.value);
  };

  const handleAnswer = async () => {
    if (queryText.length === 0) {
      toast({
        title: 'Please enter a valid text before searching',
        isClosable: true,
        status: 'error'
      });
      return;
    }
    setLoading(true);
    setAnswer('');

    const query = queryReadyText(queryText);

    logEvent({
      action: 'SEARCH_ATTEMPT',
      label: 'SEARCH',
      value: 1,
      category: 'search'
    });
    logEvent({
      action: `Search for: ${query}`,
      label: 'QUERY',
      value: 1,
      category: 'query'
    });

    const searchResponse = await fetch('/api/prompt-embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!searchResponse.ok) {
      setLoading(false);
      return;
    }

    const results: PGChunk[] = await searchResponse.json();

    if (results.length < 1) {
      setLoading(false);
      toast({
        title: "Search query can't be found in any wiki",
        isClosable: true,
        status: 'warning'
      });
      return;
    }
    setChunks(results);
    setResultId(results[0].wikiid);

    let input = query;
    if (input[input.length - 1] !== '?') {
      input += '?';
    }
    input = input.replace(/(\w)\?/g, '$1 ?');

    const prompt = endent`
    Use the following passage to answer the query(dont write any questions in output): ${input}\n

    ${results
      .map((chunk) => {
        return chunk.content;
      })
      .join('')}
    `;

    const answerResponse = await fetch('/api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!answerResponse.ok) {
      setLoading(false);
      return;
    }

    const data = answerResponse.body;

    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkvalue = decoder.decode(value);
      setAnswer((prev) => prev + chunkvalue);
    }

    setLoading(false);
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && queryText.length > 0) {
      await handleAnswer();
    } else if (event.key === 'Enter' && queryText.length === 0) {
      toast({
        title: 'Please enter a valid text before searching',
        isClosable: true,
        status: 'error'
      });
    }
  };

  const style = {
    height: 70,
    cursor: 'pointer'
  };

  const loadingSrc = useColorModeValue(FilterDark, FilterLight);

  return (
    <Flex direction='column' minH='100vh'>
      <Box w='full' textAlign='right' p='3' position='fixed'>
        <ColorModeToggle />
      </Box>
      <chakra.div flexGrow='1' display='flex' mt={{ md: '10' }}>
        <VStack gap={{ base: '10', md: '6' }} w='full' mt={{ base: '16' }}>
          <Link href='/'>
            <Flex justifyContent='center'>
              <Image
                src='./brainLogo.svg'
                w={{ base: '100px' }}
                alt='Braindao GPT logo'
              />
            </Flex>
            <Heading
              fontSize={{ xl: '36px', md: '30px', base: '24px' }}
              pt='4'
              textAlign='center'
              _hover={{ textDecoration: 'none' }}
            >
              IQ GPT
            </Heading>
          </Link>
          <form
            action=''
            onSubmit={(e) => {
              e.preventDefault();
              handleAnswer();
              router.push(
                {
                  pathname: '/',
                  query: { query: queryReadyText(queryText) }
                },
                undefined,
                { shallow: true }
              );
            }}
          >
            <VStack w='full' px={{ base: '5', md: 0 }}>
              <Flex
                w={{ base: 'full', md: '560px' }}
                gap='2'
                h='14'
                borderColor='gray.200'
                _dark={{
                  borderColor: '#ffffff3d',
                  bg: 'gray.700',
                  color: '#ffffffa3'
                }}
                bg='white'
                borderWidth='1px'
                rounded='lg'
                pl='4'
                alignItems='center'
              >
                <Input
                  placeholder='Ask me anything Crypto'
                  _placeholderShown={{
                    textOverflow: 'ellipsis'
                  }}
                  fontSize='16'
                  value={queryText || router.query.query}
                  onChange={handleInputChange}
                  variant='unstyled'
                  onKeyDown={handleKeyPress}
                  h='full'
                />
                <Button
                  type='submit'
                  bg='none'
                  px='4'
                  _hover={{ bg: 'none', color: 'gray.500' }}
                >
                  <Icon as={Search2Icon} />
                </Button>
              </Flex>

              {loading ? (
                <VStack py={{ base: '5', lg: '14' }}>
                  <Lottie animationData={loadingSrc} style={style} />
                </VStack>
              ) : (
                <VStack
                  w='full'
                  justifyContent='center'
                  alignItems='center'
                  pt='4'
                  pb='6'
                  gap='3'
                >
                  {answer.length > 0 && (
                    <SearchCard
                      result={answer}
                      resultLink={`https://iq.wiki/wiki/${resultId}`}
                      searchInput={queryText}
                    />
                  )}
                </VStack>
              )}
            </VStack>
          </form>
        </VStack>
      </chakra.div>
      <Footer />
    </Flex>
  );
}
