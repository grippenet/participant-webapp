import { PageConfig } from "case-web-app-core/build/types/pagesConfig";

const disclaimer : PageConfig = {
  "path": "/disclaimer",
  "pageKey": "disclaimer",
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
              "itemKey": "disclaimer",
              "className": "justify-p",
              "config": {
                "type": "markdown",
                "markdownUrl": "/markdowns/disclaimer.md"
              }
            }
          ]
        }
      ]
    }
  ]
}

export default disclaimer;
