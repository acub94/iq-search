import { Search2Icon } from "@chakra-ui/icons";
import { Button, Flex, Icon, Input } from "@chakra-ui/react";

interface SearchInputProps {
  handleSearch: (query: string) => void;
}

export const SearchInput = ({ handleSearch }: SearchInputProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const query = formdata.get("query") as string;
    handleSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        w={{
          base: "full",
          md: "560px",
        }}
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
        pl='4'
        alignItems='center'
      >
        <Input
          name='query'
          placeholder='Ask me anything Crypto'
          _placeholderShown={{
            textOverflow: "ellipsis",
          }}
          fontSize='16'
          variant='unstyled'
          h='full'
        />
        <Button
          type="submit"
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
  );
};
