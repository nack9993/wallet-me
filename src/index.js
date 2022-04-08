import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as bsc from "@binance-chain/bsc-use-wallet";
import { UseWalletProvider } from "use-wallet";
ReactDOM.render(
  <React.StrictMode>
    <UseWalletProvider
      chainId={1}
      connectors={{
        bsc,
      }}
    >
      <App />
    </UseWalletProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
