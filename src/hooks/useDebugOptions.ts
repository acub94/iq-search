import config, { DebugOptionsSchema } from "@/config";
import { useLocalStorage } from "./useLocalStorage";
import { z } from "zod";

export const useDebugOptions = () => {
  return useLocalStorage<z.infer<typeof DebugOptionsSchema>>(
    "DEBUG_SETTINGS",
    config.defaultDebugOptions,
  );
};
