import axios from "axios";
import { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [address, setAddress] = useState("");
  const [token, setToken] = useState("");
  const [coins, setcoins] = useState([]);
  const [ccar, setccar] = useState(0);
  const web3 = new Web3("https://bsc-dataseed1.binance.org:443");

  const ids = ["cryptocars", "zodiacs", "bomber-coin", "the-crypto-you", "wax"];

  const updateToken = (event) => {
    setToken(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    console.log(coins);
  }, [coins]);

  const getToken = async () => {
    const response = [];
    await ids.forEach(async (id) => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );

      response.push(data);

      setTimeout(() => {
        setcoins(response);
      }, 100);
    });
  };

  const getCoin = async () => {
    const tokenAddress = "0x50332bdca94673f33401776365b66cc4e81ac81d";
    const tokenSymbol = "CCAR";
    const tokenDecimals = 18;
    const tokenImage = "http://placekitten.com/200/300";

    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });

    console.log(wasAdded);
  };

  const connectWallet = async () => {
    try {
      const [account] = await window.ethereum.enable();

      setAddress(account);
    } catch (error) {
      console.log(error);
    }
  };

  const getAccount = async (address) => {
    console.log(address);
    if (!address) return 0;

    const holderAddress = "0x48506b876040653D8f313c4E5DaD4305109cdb3d";
    const abiJson = [
      {
        constant: true,
        inputs: [{ name: "who", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];

    const contract = new web3.eth.Contract(abiJson, address);
    const balance = await contract.methods.balanceOf(holderAddress).call();

    if (!balance) return 0;
    // note that this number includes the decimal places (in case of BUSD, that's 18 decimal places)

    console.log(balance);

    setccar(parseInt(balance) / 1000000000000000000);

    return parseInt(balance) / 1000000000000000000;
  };

  // Initial the account for the login
  connectWallet();

  return (
    <>
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Wallet me</h1>
        {address ? (
          <div className="flex justify-end">
            <div
              className="p-4 bg-slate-100 rounded-lg truncate w-1/2 border border-black"
              onClick={() => connectWallet()}
            >
              Account: <span className="font-bold">{address}</span>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="p-3 m-1 shadow-sm font-bold text-black border-black rounded-lg border"
              onClick={() => connectWallet()}
            >
              Connect wallet
            </button>
          </div>
        )}
      </div>

      <div className="mt-60 flex justify-center">
        <div>
          <div className="text-6xl font-bold">
            <span className="text-gray-300">NEW WALLET FOR</span> CRYPTO
          </div>
          <div className="text-gray-400">NEW GENERATION</div>

          {address ? (
            <div className="mt-5">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="token"
                type="text"
                placeholder="Token address"
                value={token}
                onChange={updateToken}
              ></input>
              <button
                className="p-3 m-1 shadow-sm font-bold text-black border-black rounded-lg border"
                onClick={() => getAccount()}
              >
                Submit
              </button>
              {/* <button
                className="p-3 m-1 shadow-sm font-bold text-black border-black rounded-lg border"
                onClick={() => getCoin()}
              >
                Add Cryptocars
              </button> */}
              <button
                className="p-3 m-1 shadow-sm font-bold text-black border-black rounded-lg border"
                onClick={() => getToken()}
              >
                Get coin
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="mt-40 p-6 h-100 flex justify-center">
        {coins.map((coin, index) => {
          console.log(coin);
          return (
            <div key={index} className="m-2 p-4 w-80 shadow">
              <div className="flex justify-center">
                <div>
                  <img
                    className="p-7  w-20 shadow-lg rounded-full"
                    src={coin.image.small}
                    alt=""
                  />

                  <div className="mt-2 text-large font-bold">{coin.name}</div>

                  <div className="mt-2 text-large font-bold">
                    {coin.market_data.ath.thb}
                  </div>

                  <div>
                    {" "}
                    You have{" "}
                    {getAccount(coin.contract_address) *
                      coin.market_data.current_price.thb}{" "}
                  </div>
                  <button
                    className="p-3 m-1 shadow-sm font-bold text-black border-black rounded-lg border"
                    onClick={() => getAccount(coin.contract_address)}
                  >
                    Get Coin
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
