import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConnectedRouter } from "connected-react-router";
import './index.css';
import App from "./shared/App";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./redux/configStore";
import { history } from "./redux/configStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

reportWebVitals();
