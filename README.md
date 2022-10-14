# web-client
The web-interface for the participants of the Influenzanet platform


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Web UI configuration

Start by creating a fork of this repo in your local organisation or create a local copy of this repository.

The example-public-folder contains example configurations within the assets folder. Replace the content here to make changes as needed.

1. Update the public/assets/locales to add folders for each supported language.
2. Configure the keys, markdown content within the locales folders.
3. Upload additional images needed into the public/assets/images folder.
4. Configure page layouts, headers, and footers by configuring the files present in public/assets/configs.
  
4.1. **Appconfig**: Set the language codes for the supported languages here. Also configure the avatars available for user profiles here.

4.2. **header**: Set the logo image and styles used in the header here.

4.3. **Navbar**: Set the items and the URL's they map on the navigation bar. This also includes the items that show up under the user dropdown on the right corner of the navbar.

4.4. **Footer**: Configure the columns and links in the footer section.

4.5. **Pages**: Contains an array of the different pages of the webapp. Here you can map a url to a page, and set the layout, contents, elements and styles for each page item. Note: "pageKey" is used to map to a file in locales to render the labels for the elements of the page in each language. "itemkey" defines the name to be looked for in the file defined by "pageKey".



## Deployment Setup

1. Create a fork of this repo in your local organisation. 
2. Copy env-sample.config to .env.production (this file should be commited so should never contains secret values)
3. Configure the fields present in the file env-sample.config. Make sure to update the fields like Recaptcha key, instance, etc. Lookup step 1 of local setup for examples.
4. Create github secrets for the following fields:

- DOCKER_ORGANIZATION
- DOCKER_REPO_NAME
- DOCKER_USER
- DOCKER_PASSWORD

1. Configure the actions file under .github/workflows/docker-image.yml to build and deploy docker images as needed.

## Local Setup

1. Create `.env.local` using the template .env.local.template

Replace the connect urls with all the urls which must be allowed in CSP connect-src, including PARTICIPANT-API SERVICE address, separated by spaces.
The option "unsafe-eval" in script-src, is needed for Vega plot rendering.

Note: System falls back to 'en' if REACT_APP_DEFAULT_LANGUAGE and REACT_APP_FALLBACK_LANGUAGE is not set.

2. Install dependencies by running ```yarn install```

3. Run the web ui by entering ```yarn start```
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
