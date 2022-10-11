import React, { useEffect, useState } from 'react';
import { AppCore } from 'case-web-app-core';
import { useTranslation } from 'react-i18next';
import { appConfig } from "./configs/app";

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

const App: React.FC = () => {
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
    // Header config
    fetch(`${process.env.REACT_APP_CONTENT_URL}/configs/header.json`)
      .then(res => res.json())
      .then(value => setHeaderConfig(value))
      .catch(error => console.log(error));

    // Navbar config
    fetch(`${process.env.REACT_APP_CONTENT_URL}/configs/navbar.json`)
      .then(res => res.json())
      .then(value => setNavbarConfig(value))
      .catch(error => console.log(error));

    // Pages config
    fetch(`${process.env.REACT_APP_CONTENT_URL}/configs/pages.json`)
      .then(res => res.json())
      .then(value => setPagesConfig(value))
      .catch(error => console.log(error));

    // Footer Config
    fetch(`${process.env.REACT_APP_CONTENT_URL}/configs/footer.json`)
      .then(res => res.json())
      .then(value => setFooterConfig(value))
      .catch(error => console.log(error));

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
      />
    </React.Fragment>
  );
};

export default App;
