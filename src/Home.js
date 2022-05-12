import React, { useState } from "react";
import {
  useMoralis,
  useERC20Transfers,
  useMoralisWeb3Api,
} from "react-moralis";

import NativeBalance from "../src/components/nativeBalance";
function Home() {
  const { authenticate, isAuthenticated, setUserData } = useMoralis();
  const [username, setUsername] = useState("Hi");
  const login = async () => {
    await authenticate({
      signingMessage: "Log in using Moralis",
      email: "nack@buzzwoo.de",
    })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateUser = async () => {
    await setUserData({
      username: username,
      email: "batman@marvel.com",
      numberOfCats: 12,
    });
    console.log("Done");
  };

  const updateUsername = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  const TransferEth = () => {
    // const { fetch, error, isFetching } = useWeb3Transfer({
    //   amount: Moralis.Units.ETH(0.5),
    //   receiver: "0x0000000000000000000000000000000000000000",
    //   type: "native",
    // });
    // fetch();
  };

  const FetchTokenMetadata = async () => {
    const { token } = useMoralisWeb3Api();
    //Get metadata for an array of tokens. Ex: USDT and USDC tokens on BSC
    const options = {
      chain: "bsc testnet",
      symbols: ["BNB", "AAVE"],
    };
    const tokenArrayMetadata = await token.getTokenMetadataBySymbol(options);
    console.log(tokenArrayMetadata);
  };

  return (
    <div>
      <div>
        <img
          className="absolute"
          src="https://market.cube.store/images/common/main-mask.png"
          alt="mask"
        />
        <div className="flex justify-center items-center flex-col text-white h-screen bg-primary">
          <span className="text-6xl font-bold ">WALLET ME</span>
          <div>A website for checking the coin that you have!</div>
          {!isAuthenticated ? (
            <button
              disabled={isAuthenticated}
              className="p-3 mt-10 shadow-sm font-bold text-white border-white rounded-lg border"
              onClick={login}
            >
              Login with Metamask
            </button>
          ) : (
            ""
          )}
        </div>
        {isAuthenticated ? <NativeBalance /> : ""}
        {/* <div className="flex justify-center items-center -mt-28 space-x-4">
            <div className="h-28 w-48 bg-tahiti-200 rounded-lg flex justify-center items-center hover:h-48">
              <span className="font-bold">BTC</span>
            </div>
            <div className="h-28 w-48 bg-orange rounded-lg flex justify-center items-center ">
              <span className="font-bold">BSC</span>
            </div>
          </div> */}
        {/* <div className="flex justify-center items-center -mt-5">
            <div className="flex justify-center items-center  w-9/12 bg-white rounded-lg shadow-lg h-16 space-x-3">
              <p className="font-bold "> Welcome: {user.get("username")}</p>
              <p className="font-bold ">
                {" "}
                You cat is {user.get("numberOfCats")}
              </p>
            </div>
          </div> */}

        {/* <Account /> */}
        {/* 
          <section className="h-screen">
            <button
              className="p-3 m-1 shadow-sm font-bold text-black border-black rounded-lg border cursor-pointer"
              onClick={updateUser}
              disabled={isUserUpdating}
            >
              Set user data
            </button>
            <button
              className="p-3 m-1 shadow-sm font-bold text-black border-black rounded-lg border cursor-pointer"
              onClick={TransferEth}
            >
              Tranfer money
            </button>
            <div>
              {error && <>{JSON.stringify(error)}</>}
              <button
                className="p-3 m-1 shadow-sm font-bold text-black border-black rounded-lg border cursor-pointer"
                onClick={() =>
                  fetchERC20Transfers({ params: { chain: "bsc testnet" } })
                }
              >
                Refetch
              </button>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          </section> */}

        {/* <form action="">
            <label>Username</label>
            <input
              type="text"
              className="p-3 m-1 shadow-sm font-bold text-black border-black rounded-lg border"
              onChange={updateUsername}
            ></input>
          </form> */}
      </div>

      {/* <h1>Welcome {user.get("username")}</h1> */}
    </div>
  );
}

export default Home;
