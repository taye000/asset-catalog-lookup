import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const chainIDs = [
    {
      value: "1",
      text: "1",
    },
    {
      value: "2",
      text: "2",
    },
    {
      value: "3",
      text: "3",
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
          authorization: "ckey_ebedb7e86d2b469c96c168953db",
        },
      })
      .then((data) => console.log(data));
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setChain(event.target.value);
  };

  console.log(walletAddress);
  console.log(chain);

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
                <div className="chainID">Chain ID</div>
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
