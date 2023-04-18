import { createI18n } from "next-international";
import { z } from "zod";

const localeMaps = {
  en: () => import("./en"),
  kr: () => import("./kr"),
};

export const localeSchema = z.enum(["en", "kr"]);

export const allLocales = [
  {
    code: "en",
    name: "English",
    noAnswer: "Sorry, I don't know how to help with that.",
  },
  {
    code: "kr",
    name: "한국어",
    noAnswer: "죄송합니다. 제가 도와드릴 수 없는 질문입니다.",
  },
] as const;

export const {
  useI18n,
  I18nProvider,
  getLocaleProps,
  useCurrentLocale,
  useChangeLocale,
} = createI18n(localeMaps);
