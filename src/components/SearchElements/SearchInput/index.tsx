import { Search2Icon } from "@chakra-ui/icons";
import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface SearchInputProps {
  handleSearch: (query: string) => void;
  query: string;
}

export const SearchInput = ({ handleSearch, query }: SearchInputProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const query = formdata.get("query") as string;
    handleSearch(query);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (query.length === 0) return;

    const queryParam = new URLSearchParams({
      query: e.target.value,
    });
    const url = new URL(window.location.pathname, window.location.origin);
    url.search = queryParam.toString();
    window.history.pushState({}, "", url.toString());
  };

  return (
    <Flex justifyContent='center' w='full'>
      <form onSubmit={handleSubmit}>
        <Flex
          mx='auto'
          gap='2'
          h='14'
          borderColor='gray.200'
          _dark={{
            borderColor: "#ffffff3d",
            bg: "gray.700",
            color: "#ffffffa3",
          }}
          bg='white'
          borderWidth='1px'
          rounded='lg'
          alignItems='center'
        >
          <Input
            pl='4'
            name='query'
            placeholder='Ask me anything Crypto'
            _placeholderShown={{
              textOverflow: "ellipsis",
            }}
            defaultValue={query}
            fontSize='16'
            variant='unstyled'
            h='full'
            w="clamp(50px, 60vw, 500px)"
            onChange={handleInputChange}
          />
          <Button
            type='submit'
            bg='none'
            px='4'
            _hover={{
              bg: "none",
              color: "gray.500",
            }}
          >
            <Icon as={Search2Icon} />
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
