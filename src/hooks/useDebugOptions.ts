import config from "@/config";
import { useLocalStorage } from "./useLocalStorage";

export const useDebugOptions = () => {
  return useLocalStorage("DEBUG_SETTINGS", config.defaultDebugOptions);
};
