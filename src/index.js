import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/redux-store";
import { Provider } from "react-redux";

import './i18n';


const root = ReactDOM.createRoot(document.getElementById("root")); //Вывел это строку из функции rerenderEntireTree чтобы не пропал фокус с textarea, после ввода каждого символа актуальной на версии реакта объявляется переменная root, через которую уже позже рендериться приложение

root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);

reportWebVitals();
