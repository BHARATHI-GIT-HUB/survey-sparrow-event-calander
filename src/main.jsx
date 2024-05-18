import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContexWrapper from "./context/ContexWrapper.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContexWrapper>
      <App />
    </ContexWrapper>
  </React.StrictMode>
);
