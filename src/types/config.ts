import { AppConfig } from '@influenzanet/case-web-app-core/build/types/appConfig';
import { FooterConfig } from '@influenzanet/case-web-app-core/build/types/footerConfig';
import { HeaderConfig } from '@influenzanet/case-web-app-core/build/types/headerConfig';
import { NavbarConfig } from '@influenzanet/case-web-app-core/build/types/navbarConfig';
import { PagesConfig } from '@influenzanet/case-web-app-core/build/types/pagesConfig';

export interface ConfigData {
    appConfig: AppConfig,
    header: HeaderConfig,
    navbar: NavbarConfig,
    pages: PagesConfig,
    footer: FooterConfig,
}
  