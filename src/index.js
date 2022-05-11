import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Home from "./Home";
import Token from "./Token";
import * as bsc from "@binance-chain/bsc-use-wallet";
// import { UseWalletProvider } from "use-wallet";
import { MoralisProvider } from "react-moralis";
console.log("Hi index");
ReactDOM.render(
  <React.StrictMode>
    {/* <UseWalletProvider
      chainId={1}
      connectors={{
        bsc,
      }}
    >
      <App />
    </UseWalletProvider> */}
    <MoralisProvider
      appId="HyFT3WN6vdftWC4OoTi4K1Ja3YfbR4FXciCuoPaT"
      serverUrl="https://5cszaxirbexn.usemoralis.com:2053/server"
    >
      <Home />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
