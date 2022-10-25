import { ConfigData } from "./types";
import { FooterConfig } from 'case-web-app-core/build/types/footerConfig';
import { HeaderConfig } from 'case-web-app-core/build/types/headerConfig';
import { NavbarConfig } from 'case-web-app-core/build/types/navbarConfig';
import { PagesConfig } from 'case-web-app-core/build/types/pagesConfig';

import { appConfig } from "./configs/app";
import header from "./configs/header.json";
import footer from "./configs/footer.json";
import navbar from "./configs/navbar.json";
import pages from "./configs/pages.json";

export const config : ConfigData = {
    appConfig: appConfig,
    header: header as HeaderConfig,
    footer: footer as FooterConfig,
    navbar: navbar as NavbarConfig,
    pages: pages as PagesConfig
};

