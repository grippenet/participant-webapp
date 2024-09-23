
import { PageConfig } from "@influenzanet/case-web-app-core/build/types/pagesConfig";

import welcome from "./welcome.json";
import home from "./home.json";
import settings from "./settings.json";
import faq from "./faq.json"
import contacts from "./contact";
import privacy from "./privacy";
import accessibility from "./accessibility";
import disclaimer from "./disclaimer";
import cookies from "./cookies";


export const pages: PageConfig[] = [
  welcome as PageConfig,
  home as PageConfig,
  settings as PageConfig,
  faq as PageConfig,
  contacts,
  privacy,
  accessibility,
  disclaimer,
  cookies
];
