import React, { useState, useEffect } from "react";
import { useMoralisWeb3Api } from "react-moralis";

let isLoaded = false;

function GetNative() {
  const [tokens, setTokens] = useState([]);
  const Web3API = useMoralisWeb3Api();

  function FetchTokens() {
    const fetchNativeBalance = async () => {
      if (isLoaded) return;
      const result = await Web3API.account.getTokenBalances({
        chain: "bsc",
      });
      setTokens([...result]);
      isLoaded = true;
    };

    fetchNativeBalance();
  }

  useEffect(() => {
    console.log(tokens);
  }, [tokens]);

  setTimeout(() => {
    FetchTokens();
  }, 1000);

  return (
    <div className=" h-full p-10 bg-primary  flex flex-col items-center justify-center ">
      {/* <button
        className="w-48 h-12 shadow-2xl bg-orange rounded-md text-white cursor-pointer"
        onClick={FetchTokens}
      >
        Show all your coin
      </button> */}
      <div className="flex flex-wrap space-x-4 space-y-4 items-center justify-center">
        {tokens.map((item, key) => {
          return (
            <div
              className="text-center w-52 h-72 rounded-xl flex flex-col items-center text-white justify-center bg-gradient-to-b from-blue-100 to-blue-200 shadow-lg shadow-blue"
              key={key}
            >
              <span className="font-bold text-lg">{item.name}</span>
              <br />
              <div>{item.balance / 1000000000000000000}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GetNative;
