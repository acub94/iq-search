import { createI18n } from "next-international";

const localeMaps = {
  en: () => import("./en"),
  kr: () => import("./kr"),
};

export const allLocales = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "kr",
    name: "한국어",
  },
] as const;

export const {
  useI18n,
  I18nProvider,
  getLocaleProps,
  useCurrentLocale,
  useChangeLocale,
} = createI18n(localeMaps);
