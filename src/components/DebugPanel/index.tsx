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
import { useI18n } from "@/locales";

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
  const t = useI18n();

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
              label={t("debugMatchCountLabel")}
              name="matchCount"
              methods={methods}
              description={t("debugMatchCountDescription")}
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
              label={t("debugTemperatureLabel")}
              name="temperature"
              methods={methods}
              description={t("debugTemperatureDescription")}
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
              label={t("debugSimilarityThresholdLabel")}
              name="similarityThreshold"
              methods={methods}
              description={t("debugSimilarityThresholdDescription")}
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
                  Tables to use
            =======================*/}

            <FieldWrapper
              label={t("debugTableToUseLabel")}
              name="pgTables"
              methods={methods}
              description={t("debugTableToUseDescription")}
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
              label={t("debugMaxTokensLabel")}
              name="maxTokens"
              methods={methods}
              description={t("debugMaxTokensDescription")}
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
              {t("debugRestoreDefaults")}
            </Button>
            <Button type="submit" colorScheme='brand'>
              {t("debugSave")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default DebugPanel;
