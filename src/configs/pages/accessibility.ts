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
                "type": "markdown",
                "markdownUrl": "/markdowns/accessibility.md"
              }
            }
          ]
        }
      ]
    }
  ]
};

export default accessibility;
