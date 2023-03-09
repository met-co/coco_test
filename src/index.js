import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter as Router, Route } from "react-router-dom";

//page 임포트
import App from "./App";
import NotFound from "./pages/NotFound";
import Login from "./components/Login/Login";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Kakao from "./components/Login/Kakao";
import SignUp from "./pages/SignUp";
import Notice from "./pages/Notice";
import Members from "./pages/Members";

// 리덕스, 스토어
// import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import store from "./redux/config/Store";
import axios from "axios";

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: "Login", element: <Login /> },
      { path: "SignUp", element: <SignUp /> },
      { path: "detail/:openviduRoomId", element: <Detail /> },
      { path: "user/kakao", element: <Kakao /> },
      { path: "notice", element: <Notice /> },
      { path: "members", element: <Members /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    {/* <CookiesProvider> */}
    <RouterProvider router={router} />
    {/* </CookiesProvider> */}
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
