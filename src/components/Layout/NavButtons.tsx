import { allLocales, useChangeLocale, useCurrentLocale } from "@/locales";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

export const NavButtons = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const ColorModeIcon = colorMode === "light" ? RiMoonFill : RiSunFill;

  return (
    <HStack spacing={3} justify="flex-end">
      <Menu>
        <MenuButton size="sm" as={Button} rightIcon={<ChevronDownIcon />}>
          {allLocales.find(({ code }) => code === locale)?.name}
        </MenuButton>
        <MenuList>
          {allLocales.map(({ code, name }) => (
            <MenuItem
              key={code}
              value={code}
              onClick={() => changeLocale(code)}
            >
              {name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <IconButton
        aria-label='Color mode'
        icon={<ColorModeIcon />}
        onClick={toggleColorMode}
        variant='outline'
        size='sm'
        _dark={{
          borderColor: "#ffffff3d",
        }}
      />
    </HStack>
  );
};
