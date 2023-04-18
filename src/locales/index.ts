import { createI18n } from "next-international";

export const { useI18n, I18nProvider, getLocaleProps } = createI18n({
  en: () => import("./en"),
  kr: () => import("./kr"),
});
