import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client'; // for react 18 in the future ?
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {
  store,
  initI18n,
} from '@influenzanet/case-web-app-core';

import { LoadingPlaceholder } from '@influenzanet/case-web-ui';

import './index.scss';

import '@fontsource/open-sans';
// import '@fontsource/open-sans/300.css'; // for light font
import '@fontsource/open-sans/400-italic.css';
import '@fontsource/open-sans/700.css';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/fontawesome';

import 'bootstrap/dist/js/bootstrap.bundle';

import App from './App';

const localeURL = process.env.REACT_APP_CONTENT_URL + '/locales';
const defaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE ?? process.env.REACT_APP_FALLBACK_LANGUAGE ?? 'fr';
initI18n(defaultLanguage, defaultLanguage, localeURL);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<LoadingPlaceholder
        color="secondary"
        minHeight="100vh"
      />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// FOR REACT 18 : use createRoot instead of ReactDom.render But :
// 1. @influenzanet:case-web-ui and case-web-app-core ask react 17
// 2. component symptomHistory won't work with this change !
// const container = document.getElementById('root');
// const root = createRoot(container!);
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Suspense fallback={<LoadingPlaceholder
//         color="secondary"
//         minHeight="100vh"
//       />}>
//         <App />
//       </Suspense>
//     </Provider>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
