import React, { useEffect, useState } from 'react';
import { AppCore } from '@influenzanet/case-web-app-core';
import { ConfigData } from './types';
import { AppConfig } from '@influenzanet/case-web-app-core/build/types/appConfig';
import { FooterConfig } from '@influenzanet/case-web-app-core/build/types/footerConfig';
import { HeaderConfig } from '@influenzanet/case-web-app-core/build/types/headerConfig';
import { NavbarConfig } from '@influenzanet/case-web-app-core/build/types/navbarConfig';
import { PagesConfig } from '@influenzanet/case-web-app-core/build/types/pagesConfig';
import { LookupResponseComponent, registerLookupService, BMIResponseComponent, RandomCodeComponent } from 'grippenet-web-ui';
import { fr } from "date-fns/locale";
import ExternalLinkCard from './extensions/cards/ExternalLinkCard';
import YoutubeCard from './extensions/cards/YoutubeCard';
import { createUserBadgesComponent } from './extensions/userBadges/UsersBadges';
import { badgesDefinition2024 } from './extensions/userBadges/config/BadgesDefinition';

registerLookupService('postalcodes', process.env.REACT_APP_POSTALCODES_URL ?? '');

export const dateLocales = [
  { code: 'fr', locale: fr, format: 'dd/MM/yyyy' },
];

export const customSurveyResponseComponents = [
  {
    name: 'input:postalCodeLookup',
    component: LookupResponseComponent
  },
  {
    name: 'input:bmi',
    component: BMIResponseComponent
  },
  {
    name:"input:randomCode",
    component: RandomCodeComponent
  }
];


const GrippenetUserBadges = createUserBadgesComponent({
  badgeStudy: "grippenet",
  typeBadgeReportCode: "badge",
  startSeasonDate: "2024-06-01",
  badgesDefinition: badgesDefinition2024,
  badgesImgRootUrl: "/assets/badges/"
});

const extensions = [
  {
    name: 'externalLinkCard',
    component : ExternalLinkCard
  },
  {
    name: 'youtubeCard',
    component: YoutubeCard
  },
  {
    name: 'userBadges',
    component: GrippenetUserBadges
  }
];



async function fetchAllData(): Promise<ConfigData> {
  const m = await import('./config');
  return m.config;
}


const promise = fetchAllData();

const App: React.FC = () => {
  const [appConfig, setAppConfig] = useState<AppConfig>();
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>();
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig>();
  const [pagesConfig, setPagesConfig] = useState<PagesConfig>();
  const [footerConfig, setFooterConfig] = useState<FooterConfig>();
  // const { i18n } = useTranslation();


  useEffect(() => {

    promise.then(data => {
      setHeaderConfig(data.header)
      setNavbarConfig(data.navbar)
      setPagesConfig(data.pages)
      setFooterConfig(data.footer)
      setAppConfig(data.appConfig)
    });
    if (process.env.REACT_APP_DEFAULT_INSTANCE && appConfig) { appConfig.instanceId = process.env.REACT_APP_DEFAULT_INSTANCE; }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <React.Fragment>
      <AppCore
        appConfig={appConfig}
        headerConfig={headerConfig}
        navbarConfig={navbarConfig}
        pagesConfig={pagesConfig}
        footerConfig={footerConfig}
        customSurveyResponseComponents={customSurveyResponseComponents}
        extensions={extensions}
        dateLocales={dateLocales}
      />
    </React.Fragment>
  );
};

export default App;
