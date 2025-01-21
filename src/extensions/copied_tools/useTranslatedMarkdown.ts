// copied from @influenzanet/case-web-app-core/hook/useTranslatedMarkdown.ts


import { useFetchTextFile } from "@influenzanet/case-web-ui";
import { useTranslation } from "react-i18next";

export const getTranslatedMarkdownPath = (markdownName: string, language: string): string => {
  return `/locales/${language}/${markdownName}`;
}

export const useTranslatedMarkdown = (markdownPath: string) => {
  const { i18n } = useTranslation();

  const url = getTranslatedMarkdownPath(markdownPath, i18n.language);
  return useFetchTextFile(url);
}

export const getExternalTranslatedMarkdownFullUrl = (url: string, language?: string): string => {
  return url.replace('%LANG%', language ?? '');
}

const external_content_base_url = process.env.REACT_APP_EXTERNAL_CONTENT_URL?.replace(/\/$/g, '');

export const getExternalTranslatedMarkdownPath = (markdownName: string, language: string): string => {
  if (markdownName.startsWith('http')) {
    return getExternalTranslatedMarkdownFullUrl(markdownName, language)
  }
  markdownName = markdownName?.replace(/^\//g, '')
  return external_content_base_url + `/locales/${language}/${markdownName}`;
}
