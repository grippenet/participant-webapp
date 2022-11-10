import { PageConfig } from "case-web-app-core/build/types/pagesConfig";

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
          "className": "col-12 col-sm-10 col-md-8",
          "items": [
            {
              "itemKey": "accessibility",
              "className": "",
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
