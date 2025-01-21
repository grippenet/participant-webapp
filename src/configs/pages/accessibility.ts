import { PageConfig } from "@influenzanet/case-web-app-core/build/types/pagesConfig";

const accessibility : PageConfig = {
  "path": "/accessibility",
  "pageKey": "accessibility",
  "rows": [
    {
      "key": "content",
      "containerClassName": "my-3 min-vh-60",
      "columns": [
        {
          "key": "pCol",
          "className": "col-12 offset-sm-1 col-sm-10 offset-md-2 col-md-8 my-3",
          "items": [
            {
              "itemKey": "accessibility",
              "className": "justify-p",
              "config": {
                // "type": "markdown",
                // "markdownUrl": "/markdowns/accessibility.md"
                
                //// for test, assuming a markdown locales/fr/markdowns/test.md has been published on a local public-website
                "type": "extension",
                "config": {
                    "type": "externalMarkdown",
                    // "externalMarkdownUrl": "http://127.0.0.1:8000/webapp_assets/get/locales/%LANG%/markdowns/test.md",
                    "externalMarkdownUrl": "/markdowns/accessibility.md",
                }
              }
            }
          ]
        }
      ]
    }
  ]
};

export default accessibility;
