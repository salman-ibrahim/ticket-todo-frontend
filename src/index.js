import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import appSlice from "./store";

const store = configureStore({
    reducer: {
        tickets: appSlice,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Provider store={store}>
          <App/>
      </Provider>
    </BrowserRouter>
);

