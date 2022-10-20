import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

let covalent_api = process.env.REACT_APP_COVALENT_API;

function App() {
  const chainIDs = [
    {
      value: "1",
      text: "Eth",
    },
    {
      value: "56",
      text: "Bsc",
    },
    {
      value: "137",
      text: "Polygon",
    },
    {
      value: "100",
      text: "Gnosis",
    },
    {
      value: "25",
      text: "Arbitrum",
    },
    {
      value: "128",
      text: "Huobi",
    },
    {
      value: "250",
      text: "Fantom",
    },
    {
      value: "43114",
      text: "Avalanche",
    },
    {
      value: "1666600000",
      text: "Harmony",
    },
  ];
  const [data, setData] = useState([]);
  const [chain, setChain] = useState(1);
  const [walletAddress, setWalletAddress] = useState("");

  const baseUrl = `https://api.covalenthq.com/v1/${chain}/address/${walletAddress}/balances_v2/`;

  const fetchBlocks = async () => {
    await axios
      .get(baseUrl, {
        headers: {
          authorization: `Bearer ${covalent_api}`,
        },
      })
      .then((data) => console.log(data));
  };
  console.log(walletAddress);
  console.log(chain);
  console.log(covalent_api);

  const handleChange = (event) => {
    console.log(event.target.value);
    setChain(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <p>Granular Blockchain</p>
        </div>

        <div className="card">
          <div className="fields">
            <div className="field-data">
              <div>
                <div className="chainID">Chain</div>
                <select
                  value={chain}
                  onChange={handleChange}
                  id="chainID-select"
                >
                  {chainIDs.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="inputs">
                <div className="wallet-label">
                  <label for="wallet-address">Wallet Address</label>
                </div>
                <input
                  type="text"
                  placeholder="enter your wallet address"
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
              <div className="button">
                <button onClick={fetchBlocks}>Go</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
