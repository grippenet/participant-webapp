import { AppConfig } from 'case-web-app-core/build/types/appConfig';
import { FooterConfig } from 'case-web-app-core/build/types/footerConfig';
import { HeaderConfig } from 'case-web-app-core/build/types/headerConfig';
import { NavbarConfig } from 'case-web-app-core/build/types/navbarConfig';
import { PagesConfig } from 'case-web-app-core/build/types/pagesConfig';

export interface ConfigData {
    appConfig: AppConfig,
    header: HeaderConfig,
    navbar: NavbarConfig,
    pages: PagesConfig,
    footer: FooterConfig,
}
  