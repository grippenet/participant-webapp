import {  PageConfig } from "case-web-app-core/build/types/pagesConfig";

const privacy : PageConfig = {
    "path": "/privacy",
    "pageKey": "privacy",
    "rows": [
      {
        "key": "content",
        "containerClassName": "my-3 min-vh-60",
        "columns": [
          {
            "key": "pCol",
            "className": "col-12 col-sm-10 col-md-8 my-3",
            "items": [
              {
                "itemKey": "privacyPolicy",
                "className": "",
                "config": {
                  "type": "markdown",
                  "markdownUrl": "/markdowns/privacy.md"
                }
              }
            ]
          }
        ]
      }
    ]
};

export default privacy;