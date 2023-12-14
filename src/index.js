import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
// style
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// keen
import 'assets/styles/keen/theme01/plugins.bundle.css';
import 'assets/styles/keen/theme01/style.bundle.css';
// app custom style
import 'assets/styles/app.style.scss';
import './index.css';
// i18
import i18n from 'i18n';
import { I18nextProvider } from 'react-i18next';
// redux
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';
import store from 'app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <MetaMaskUIProvider
          sdkOptions={{
            dappMetadata: {
              name: 'Demo UI React App',
            },
          }}
        >
          <App />
        </MetaMaskUIProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
