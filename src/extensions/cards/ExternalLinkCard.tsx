import React from 'react';

import styles from './ExternalLinkCard.module.scss';
import clsx from 'clsx';
import { getExternalOrLocalContentURL, MarkdownLoader } from 'case-web-ui';


import { useTranslation } from 'react-i18next';
import { getTranslatedMarkdownPath } from '../copied_tools/useTranslatedMarkdown';


interface ExternalLinkCardProps {
    // given for all custom componenents
    key: string;
    pageKey: string; ///////////
    itemKey: string;
    //renderGenericItemFunc: object; // la fonction render !
    //onNavigate: // fonction de base onNavigate (push dans l'history)

    // from SimpleCard
    className?: string;
    markdownUrl?: string;
    classText?: string;
    contentText?: string;
    variantTitle?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    //from ImageCard
    imageSrc?: string;
    imageAlt?: string;
    openActionText?: string;
    showActionBtn?: string;

    // new
    containerClass?:string;
    externalLink?: string;
    externalLinkTarget?: string;
    customClassTitle?: string;
  }
  
const renderBodyText = (bodyText : string, openActionText : string) => {
    return <div className="card-body px-2 py-1a bg-secondary d-flex flex-column">
    <p className="card-text fst-italic flex-grow-1">
      {bodyText}
    </p>
    <div className="text-end">
      {openActionText ? <button className="btn btn-link text-body p-0">
        {openActionText}
        <i className={styles.icon}>
          <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
          </svg>
        </i>
      </button>
        : null}

    </div>
  </div>
}

const ExternalLinkCard: React.FC<ExternalLinkCardProps> = (props) => {

    // use Translation
    const { t, i18n } = useTranslation([props.pageKey, 'global']);
    const ctxT = (key : string) => {return t(`${props.itemKey}.${key}`)};

    const link = props.externalLink ? getExternalOrLocalContentURL(props.externalLink) : '';
    const VariantTitle = props.variantTitle || 'h6';

    const customClassTitle = props.customClassTitle ? props.customClassTitle : "";

    const title = ctxT('title');
    const bodyText = ctxT('bodyText');
    const openActionText = props.showActionBtn ? ctxT('openActionText') : '';
    const classBodyText = "";
    
    const markdownUrl = props.markdownUrl ? getTranslatedMarkdownPath(props.markdownUrl, i18n.language) : '';

    const hasLink:boolean = !!props.externalLink;

    return (
    <div 
      className={clsx(
        'card border-0 bg-white',
        styles.card,
        props.className,
        hasLink ? styles.has_link : ''
      )}
      onClick={link ? () => {document.location.href = `${link}`} :  () => {}}
    >
      {props.imageSrc ? <img className="w-100" src={getExternalOrLocalContentURL(props.imageSrc)} alt={props.imageAlt} /> : undefined}
      {title ? 
        <VariantTitle className={clsx(
          'px-2 py-1a text-white m-0',
          'fw-bold fs-btn',
          customClassTitle ? styles[customClassTitle] : 'bg-primary',
        )}>{title}</VariantTitle>
        : null}

      {props.markdownUrl ? 
          <MarkdownLoader
              className={clsx('p-2 bg-secondary', 'w-100') }
              markdownUrl={markdownUrl}
          /> 
          : null}
      {bodyText ? renderBodyText(bodyText, props.showActionBtn ? openActionText : '') : ''}
    </div>
    );
}

export default ExternalLinkCard;
