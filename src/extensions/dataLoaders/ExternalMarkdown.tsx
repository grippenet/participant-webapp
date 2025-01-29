import React from 'react';

import clsx from 'clsx';
import { MarkdownLoader } from '@influenzanet/case-web-ui';

import { useTranslation } from 'react-i18next';

import { getExternalTranslatedMarkdownPath, getTranslatedMarkdownPath } from '../copied_tools/useTranslatedMarkdown';

import { GenericPageItemProps } from '@influenzanet/case-web-app-core/build/types/extensionComponents';


interface ExternalMarkdownProps extends GenericPageItemProps {
    // From MarkdownLoader.tsx 
    markdownUrl?: string;
    flavor?: string;
    languageCode?: string;

    // allow any url different of /locales/${language}/
    externalMarkdownUrl?: string;
  }
  
/**
 * A simple extension wrapping cas-web-ui/component/dataLoaders/MardownLoader to make it able to fetch markdowns files 
 * from location out of the the participant-webapp. 
 * Don't forget relevant CORS config on the web server providing markdown files, and CSP rules in participant-webapp 
 * 
 * @param props 
 * @returns 
 */
const ExternalMarkdown: React.FC<ExternalMarkdownProps> = (props) => {

    // use Translation
    const { i18n } = useTranslation();

    let markdownUrl = props.markdownUrl ? getTranslatedMarkdownPath(props.markdownUrl, i18n.language) : '';
    if (props.externalMarkdownUrl) {
      markdownUrl = getExternalTranslatedMarkdownPath(props.externalMarkdownUrl ?? '', i18n.language);
    }

    return (
      <MarkdownLoader
          className={clsx(
            props.className
            ) }
          markdownUrl={markdownUrl}
          languageCode={props.languageCode}
          flavor={props.flavor}
      /> 
    );
}

export default ExternalMarkdown;
