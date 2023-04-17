import { useDebugOptions } from "@/hooks/useDebugOptions";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";

interface DebugPanelProps {
  isOpen: boolean;
  debugOptions: ReturnType<typeof useDebugOptions>[0];
  setDebugOptions: ReturnType<typeof useDebugOptions>[1];
  onClose: () => void;
}

const DebugPanel = ({
  isOpen,
  onClose,
  debugOptions,
  setDebugOptions,
}: DebugPanelProps) => {
  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Debug Options</DrawerHeader>

        <DrawerBody>
          <p>Some content here</p>
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue'>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DebugPanel;
