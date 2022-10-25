import React, { useEffect, useState } from 'react';
import { AppCore } from 'case-web-app-core';
import { useTranslation } from 'react-i18next';
import { ConfigData } from './types';
import { store } from 'case-web-app-core';
import { Provider } from 'react-redux';
import { AppConfig } from 'case-web-app-core/build/types/appConfig';
import { FooterConfig } from 'case-web-app-core/build/types/footerConfig';
import { HeaderConfig } from 'case-web-app-core/build/types/headerConfig';
import { NavbarConfig } from 'case-web-app-core/build/types/navbarConfig';
import { PagesConfig } from 'case-web-app-core/build/types/pagesConfig';
import { LookupResponseComponent, registerLookupService } from 'grippenet-web-ui';

registerLookupService('postalcodes', process.env.REACT_APP_POSTALCODES_URL ?? '');

export const customSurveyResponseComponents = [
  {
    name: ':postalCodeLookup',
    component: LookupResponseComponent
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
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!i18n.language) {
      i18n.changeLanguage(`${process.env.REACT_APP_DEFAULT_LANGUAGE}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

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
    <Provider store={store}>
      <AppCore
        appConfig={appConfig}
        headerConfig={headerConfig}
        navbarConfig={navbarConfig}
        pagesConfig={pagesConfig}
        footerConfig={footerConfig}
        customSurveyResponseComponents={customSurveyResponseComponents}
      />
    </Provider>
  );
};

export default App;
