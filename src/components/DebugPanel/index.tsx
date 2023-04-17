import config, { AvailablePgTables, DebugOptionsSchema } from "@/config";
import { useDebugOptions } from "@/hooks/useDebugOptions";
import { useZodForm } from "@/utils/form.utils";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { FieldWrapper } from "./FieldWrapper";

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
          <DrawerBody h="full" display="flex" flexDir="column" gap={10}>
            {/* ====================
                  Matches 
            =======================*/}
            <FieldWrapper
              label="Match Count"
              name="matchCount"
              methods={methods}
              description="Number of chunks to use to get summary"
            >
              <NumberInput>
                <NumberInputField
                  {...methods.register("matchCount", {
                    valueAsNumber: true,
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FieldWrapper>

            {/* ====================
                  Temperature
            =======================*/}

            <FieldWrapper
              label="Temperature"
              name="temperature"
              methods={methods}
              description="Temperature to use for summary generation"
            >
              <Slider
                mt={8}
                aria-label='slider-ex-1'
                min={0}
                max={2}
                step={0.01}
                colorScheme="pink"
                defaultValue={debugOptions.temperature}
                onChange={(value) => methods.setValue("temperature", value)}
              >
                <SliderMark
                  value={methods.watch("temperature")}
                  textAlign='center'
                  bg='brand.500'
                  color='white'
                  mt='-10'
                  ml='-6'
                  w='12'
                >
                  {methods.watch("temperature")}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FieldWrapper>

            {/* ====================
                similarityThreshold
            =======================*/}

            <FieldWrapper
              label="Similarity Threshold"
              name="similarityThreshold"
              methods={methods}
              description="Similarity threshold is used for chunk matches"
            >
              <Slider
                mt={8}
                aria-label='slider-ex-1'
                min={0}
                max={1}
                colorScheme="pink"
                step={0.01}
                value={methods.watch("similarityThreshold")}
                onChange={(value) =>
                  methods.setValue("similarityThreshold", value)
                }
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />

                <SliderMark
                  value={methods.watch("similarityThreshold")}
                  textAlign='center'
                  bg='brand.500'
                  color='white'
                  mt='-10'
                  ml='-6'
                  w='12'
                >
                  {methods.watch("similarityThreshold")}
                </SliderMark>
              </Slider>
            </FieldWrapper>

            {/* ====================
                  pgFunction
            =======================*/}

            <FieldWrapper
              label="Table to use"
              name="pgTables"
              methods={methods}
              description="Table to use for chunk matches."
            >
              <Select {...methods.register("pgTables")}>
                {Object.values(AvailablePgTables.Values).map((fnName) => (
                  <option key={fnName} value={fnName}>
                    {fnName}
                  </option>
                ))}
              </Select>
            </FieldWrapper>

            {/* ====================
                  Max Tokens
            =======================*/}

            <FieldWrapper
              label="Max Tokens"
              name="maxTokens"
              methods={methods}
              description="Max tokens to use for summary generation."
            >
              <NumberInput>
                <NumberInputField
                  value={methods.watch("maxTokens")}
                  {...methods.register("maxTokens", {
                    valueAsNumber: true,
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FieldWrapper>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant='outline'
              mr={3}
              onClick={() => {
                setDebugOptions(config.defaultDebugOptions);
                methods.reset(config.defaultDebugOptions);
              }}
            >
              Restore Defaults
            </Button>
            <Button type="submit" colorScheme='brand'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default DebugPanel;
