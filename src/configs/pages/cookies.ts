import { PageConfig } from "case-web-app-core/build/types/pagesConfig";

const cookies : PageConfig = {
  "path": "/cookies",
  "pageKey": "cookies",
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
              "itemKey": "contact",
              "className": "",
              "config": {
                "type": "markdown",
                "markdownUrl": "/markdowns/cookies.md"
              }
            }
          ]
        }
      ]
    }
  ]
};

export default cookies;
