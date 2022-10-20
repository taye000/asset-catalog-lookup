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
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [fetched2, setFetched2] = useState(false);
  const [fetched3, setFetched3] = useState(false);

  const [chain, setChain] = useState(1);
  const [walletAddress, setWalletAddress] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [txhash, setTxHash] = useState("");

  const baseUrl = `https://api.covalenthq.com/v1/${chain}/address/${walletAddress}/balances_v2/`;
  const baseUrl2 = `https://api.covalenthq.com/v1/${chain}/tokens/${contractAddress}/token_holders/`;
  const baseUrl3 = `https://api.covalenthq.com/v1/${chain}/transaction_v2/${txhash}/`;

  const fetchBlocks = async () => {
    await axios
      .get(baseUrl, {
        headers: {
          authorization: `Bearer ${covalent_api}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((data) => setData(data.data.data.items));
    setFetched(true);
  };

  const fetchContract = async () => {
    await axios
      .get(baseUrl2, {
        headers: {
          authorization: `Bearer ${covalent_api}`,
        },
      })
      .then((data) => setData2(data.data.data.items));
    setFetched2(true);
  };

  const fetchTransactions = async () => {
    await axios
      .get(baseUrl3, {
        headers: {
          authorization: `Bearer ${covalent_api}`,
        },
      })
      .then((data) => setData3(data.data.data.items));
    setFetched3(true);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setChain(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <p>Any Blockchain Explorer</p>
        </div>

        <div className="container">
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
              {fetched ? (
                <div className="button">
                  <button className="hide" onClick={() => setFetched(false)}>
                    Hide
                  </button>
                </div>
              ) : (
                <div className="button">
                  <button onClick={() => setFetched(true)}>Show</button>
                </div>
              )}
            </div>
          </div>
        </div>
        {fetched ? (
          <div className="data-container">
            <div className="data">
              {data.map((item) => (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Contract Name</th>
                      <th scope="col">contract_ticker_symbol</th>
                      <th scope="col">quote_rate</th>
                      <th scope="col">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.contract_name}</td>
                      <td>{item.contract_ticker_symbol}</td>
                      <td>{item.quote_rate}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="container">
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
              {fetched2 ? (
                <div className="button">
                  <button className="hide" onClick={() => setFetched2(false)}>
                    Hide
                  </button>
                </div>
              ) : (
                <div className="button">
                  <button onClick={() => setFetched2(true)}>Show</button>
                </div>
              )}
            </div>
          </div>
        </div>
        {fetched2 ? (
          <div className="data-container">
            <div className="data">
              {data2.map((item) => (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Contract Name</th>
                      <th scope="col">contract_ticker_symbol</th>

                      <th scope="col">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.contract_name}</td>
                      <td>{item.contract_ticker_symbol}</td>

                      <td>{item.balance}</td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="container">
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
                  <label for="wallet-address"> TX Hash</label>
                </div>
                <input
                  type="text"
                  placeholder="enter your txhash "
                  onChange={(e) => setTxHash(e.target.value)}
                />
              </div>
              <div className="button">
                <button onClick={fetchTransactions}>Go</button>
              </div>
              {fetched3 ? (
                <div className="button">
                  <button className="hide" onClick={() => setFetched3(false)}>
                    Hide
                  </button>
                </div>
              ) : (
                <div className="button">
                  <button onClick={() => setFetched3(true)}>Show</button>
                </div>
              )}
            </div>
          </div>
        </div>
        {fetched3 ? (
          <div className="data-container">
            <div className="data">
              {data3.map((item) => (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Successful</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                      <th scope="col">Gas Spent</th>
                      <th scope="col">Sender Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.successful == true ? "True" : "false"}</td>
                      <td>{item.from_address}</td>
                      <td>{item.to_address}</td>
                      <td>{item.gas_spent}</td>
                      {item.log_events.map((item) => (
                        <td>{item.sender_name}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
