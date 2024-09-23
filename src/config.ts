import { ConfigData } from "./types";
import { FooterConfig } from '@influenzanet/case-web-app-core/build/types/footerConfig';
import { HeaderConfig } from '@influenzanet/case-web-app-core/build/types/headerConfig';
import { NavbarConfig } from '@influenzanet/case-web-app-core/build/types/navbarConfig';
import { PagesConfig } from '@influenzanet/case-web-app-core/build/types/pagesConfig';

import { appConfig } from "./configs/app";
import header from "./configs/header.json";
import footer from "./configs/footer.json";
import navbar from "./configs/navbar.json";
import { pages } from "./configs/pages";

const pagesDef : PagesConfig = {
  "defaultRoutes": {
    "auth": "/home",
    "unauth": "/welcome",
    "studyPage": "/home",
    "surveyPage": "/surveys"
  },
  pages: pages
};

export const config : ConfigData = {
    appConfig: appConfig,
    header: header as HeaderConfig,
    footer: footer as FooterConfig,
    navbar: navbar as NavbarConfig,
    pages: pagesDef,
};

