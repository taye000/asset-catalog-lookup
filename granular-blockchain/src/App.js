import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

let covalent_api = "ckey_ebedb7e86d2b469c96c168953db";

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
  const [contractAddress, setContractAddress] = useState("");

  const baseUrl = `https://api.covalenthq.com/v1/${chain}/address/${walletAddress}/balances_v2/`;
  const baseUrl2 = `https://api.covalenthq.com/v1/${chain}/address/${contractAddress}/balances_v2/`;

  const fetchBlocks = async () => {
    await axios
      .get(baseUrl, {
        headers: {
          authorization: `Bearer ${covalent_api}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((data) => setData(data.data.data.items));
  };

  const fetchContract = async () => {
    await axios
      .get(baseUrl2, {
        headers: {
          authorization: `Bearer ${covalent_api}`,
        },
      })
      .then((data) => setData(data.data.data.items));
  };

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
        <div className="data-container">
          <div className="data">
            {data.map((item) => (
              <div className="item">
                <div>
                  <strong>Contract Name</strong>: {item.contract_name}
                </div>
                <div>
                  <strong>Contract Ticker Symbol</strong>:{" "}
                  {item.contract_ticker_symbol}
                </div>
                <div>
                  <strong>Quote Rate</strong>: {item.quote_rate}
                </div>
                <div>
                  <strong>Balance</strong>: {item.balance}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-2">
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
                  <label for="wallet-address">Contract Address</label>
                </div>
                <input
                  type="text"
                  placeholder="enter your contract address"
                  onChange={(e) => setContractAddress(e.target.value)}
                />
              </div>
              <div className="button">
                <button onClick={fetchContract}>Go</button>
              </div>
            </div>
          </div>
        </div>
        <div className="data-container">
          <div className="data">
            {data.map((item) => (
              <div className="item">
                <div>
                  <strong>Contract Name</strong>: {item.contract_name}
                </div>
                <div>
                  <strong>Contract Ticker Symbol</strong>:{" "}
                  {item.contract_ticker_symbol}
                </div>
                <div>
                  <strong>Quote Rate</strong>: {item.quote_rate}
                </div>
                <div>
                  <strong>Balance</strong>: {item.balance}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
