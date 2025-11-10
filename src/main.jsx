import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import router from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#22c55e",
                },
            }}
      >
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={2000} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
