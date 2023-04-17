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
import { useZodForm } from "@/utils/form.utils";
import { DebugOptionsSchema } from "@/config";

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
  const methods = useZodForm({
    schema: DebugOptionsSchema,
    defaultValues: debugOptions,
  });

  const handleSubmit = methods.handleSubmit((data) => {
    setDebugOptions(data);
    onClose();
  });

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <form onSubmit={handleSubmit}>
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Debug Options</DrawerHeader>
          <DrawerBody h="full">hello</DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme='blue'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default DebugPanel;
