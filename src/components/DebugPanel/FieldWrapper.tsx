import { DebugOptionsSchema } from "@/config";
import { useZodForm } from "@/utils/form.utils";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { z } from "zod";

export const FieldWrapper = ({
  children,
  methods,
  label,
  name,
  description,
}: {
  children: React.ReactNode;
  label?: string;
  name: keyof z.infer<typeof DebugOptionsSchema>;
  methods: ReturnType<typeof useZodForm>;
  description: string;
}) => {
  const error = methods.formState.errors[name]?.message;
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label || name}</FormLabel>
      {children}
      {error ? (
        <FormErrorMessage textColor="red.500">
          {error as string}
        </FormErrorMessage>
      ) : (
        <FormHelperText>{description}</FormHelperText>
      )}
    </FormControl>
  );
};
