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
      value: "1666700000",
      text: "Harmony",
    },
  ];

  const StartingBlock = [{ value: 13916192, text: "Block 1" }];

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [map, setMapchain] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [fetched2, setFetched2] = useState(false);
  const [fetched3, setFetched3] = useState(false);
  const [fetched4, setFetched4] = useState(false);
  const [fetched5, setFetched5] = useState(false);
  const [fetched6, setFetched6] = useState(false);
  const [fetched7, setFetched7] = useState(false);

  const [chain, setChain] = useState(1);
  const [startingBlock, setStartingBlock] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [txhash, setTxHash] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const baseUrl = `https://api.covalenthq.com/v1/${chain}/address/${walletAddress}/balances_v2/`;
  const baseUrl2 = `https://api.covalenthq.com/v1/${chain}/tokens/${contractAddress}/token_holders/`;
  const baseUrl3 = `https://api.covalenthq.com/v1/${chain}/transaction_v2/${txhash}/`;
  const baseUrl4 = `https://api.covalenthq.com/v1/${chain}/block_v2/${start}/${end}/`;
  const baseUrl5 = `https://api.covalenthq.com/v1/chains/`;
  const mapchain = `https://api.covalenthq.com/v1/chains/`;
  const baseUrl6 = `https://api.covalenthq.com/v1/chains/status/`;
  const baseUrl7 = `https://api.covalenthq.com/v1/${chain}/tokens/${contractAddress}/token_holders_changes/?starting-block=${startingBlock}&ending-block=latest`;

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
  const fetchBlockHeights = async () => {
    await axios
      .get(baseUrl4, {
        headers: {
          authorization: `Bearer ${covalent_api}`,
        },
      })
      .then((data) => setData4(data.data.data.items));
    setFetched4(true);
  };

  const fetchAllchains = async () => {
    await axios
      .get(baseUrl5, {
        headers: {
          authorization: `Bearer ${covalent_api}`,
        },
      })
      .then((data) => setData5(data.data.data.items));
    setFetched5(true);
  };
  const fetchMapchain = async () => {
    await axios
      .get(mapchain, {
        headers: {
          authorization: `Bearer ${covalent_api}`,
        },
      })
      .then((data) => setData5(data.data.data.items));
    setMapchain(true);
  };
  useEffect(() => {
    fetchMapchain();
    // setData5(true);
  }, []);
  const fetchChainStatus = async () => {
    await axios
      .get(baseUrl6, {
        headers: {
          authorization: `Bearer ${covalent_api}`,
        },
      })
      .then((data) => setData6(data.data.data.items));
    setFetched6(true);
  };
  const fetchChangesInTokenHolders = async () => {
    await axios
      .get(baseUrl7, {
        headers: {
          authorization: `Bearer ${covalent_api}`,
        },
      })
      .then((data) => setData7(data.data.data.items));
    setFetched7(true);
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

                <select>
                  {data5.map((item) => (
                    <option>{item.chain_id}</option>
                  ))}
                </select>
              </div>
              <div className="inputs">
                <div className="wallet-label">
                  <label for="wallet-address">Wallet Address</label>
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="enter your wallet address"
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
              <div>
                <button className="button1" onClick={fetchBlocks}>
                  Go
                </button>
              </div>
              {fetched ? (
                <div>
                  <button className="button2" onClick={() => setFetched(false)}>
                    Hide
                  </button>
                </div>
              ) : (
                <div>
                  <button className="button3" onClick={() => setFetched(true)}>
                    Show
                  </button>
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
                  onChange={(e) => setChain(e.target.value)}
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
                  className="input"
                  type="text"
                  placeholder="enter your contract address"
                  onChange={(e) => setContractAddress(e.target.value)}
                />
              </div>
              <div>
                <button className="button1" onClick={fetchContract}>
                  Go
                </button>
              </div>
              {fetched2 ? (
                <div>
                  <button
                    className="button2"
                    onClick={() => setFetched2(false)}
                  >
                    Hide
                  </button>
                </div>
              ) : (
                <div>
                  <button className="button3" onClick={() => setFetched2(true)}>
                    Show
                  </button>
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
                  onChange={(e) => setChain(e.target.value)}
                  id="chainID-select"
                >
                  {chainIDs.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="chainID">Starting Block</div>

                <select
                  value={startingBlock}
                  onChange={(e) => setStartingBlock(e.target.value)}
                  id="chainID-select"
                >
                  {StartingBlock.map((option) => (
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
                  className="input"
                  type="text"
                  placeholder="enter your contract address"
                  onChange={(e) => setContractAddress(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="button1"
                  onClick={fetchChangesInTokenHolders}
                >
                  Go
                </button>
              </div>
              {fetched7 ? (
                <div>
                  <button
                    className="button2"
                    onClick={() => setFetched7(false)}
                  >
                    Hide
                  </button>
                </div>
              ) : (
                <div>
                  <button className="button3" onClick={() => setFetched7(true)}>
                    Show
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {fetched7 ? (
          <div className="data-container">
            <div className="data">
              {data7.map((item) => (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Token Holder</th>
                      <th scope="col">Difference</th>
                      <th scope="col">Previous BlockHeight</th>
                      <th scope="col">Next BlockHeight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.token_holder}</td>
                      <td>{item.diff}</td>
                      <td>{item.prev_block_height}</td>
                      <td>{item.next_block_height}</td>
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
                  onChange={(e) => setChain(e.target.value)}
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
                  className="input"
                  type="text"
                  placeholder="enter your txhash "
                  onChange={(e) => setTxHash(e.target.value)}
                />
              </div>
              <div>
                <button className="button1" onClick={fetchTransactions}>
                  Go
                </button>
              </div>
              {fetched3 ? (
                <div>
                  <button
                    className="button2"
                    onClick={() => setFetched3(false)}
                  >
                    Hide
                  </button>
                </div>
              ) : (
                <div>
                  <button className="button3" onClick={() => setFetched3(true)}>
                    Show
                  </button>
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
                      <td>{item.successful === true ? "True" : "false"}</td>
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
        <div className="container">
          <div className="fields">
            <div className="field-data">
              <div>
                <div className="chainID">Chain ID</div>

                <select
                  value={chain}
                  onChange={(e) => setChain(e.target.value)}
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
                <div className="date-inputs">
                  <div className="end">
                    <div>
                      <label className="wallet-label" for="wallet-address">
                        Start Date
                      </label>
                    </div>
                    <input
                      type="date"
                      placeholder="enter your wallet address"
                      name="wallet-address"
                      onChange={(e) => setStart(e.target.value)}
                    />
                  </div>
                  <div className="end">
                    <div>
                      <label className="wallet-label" htmlFor="end-date">
                        End Date
                      </label>
                    </div>
                    <input
                      type="date"
                      onChange={(e) => setEnd(e.target.value)}
                      name="end-date"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button className="button1" onClick={fetchBlockHeights}>
                  Go
                </button>
              </div>
              {fetched4 ? (
                <div>
                  <button
                    className="button2"
                    onClick={() => setFetched4(false)}
                  >
                    Hide
                  </button>
                </div>
              ) : (
                <div>
                  <button className="button3" onClick={() => setFetched4(true)}>
                    Show
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {fetched4 ? (
          <div className="data-container">
            <div className="data">
              {data4.map((item) => (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Signed At</th>
                      <th scope="col">Height</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.signed_at}</td>

                      <td>{item.height}</td>
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
              <div className="get-chains">Get all chains</div>
              <div>
                <button className="button1" onClick={fetchAllchains}>
                  Get All Chains
                </button>
              </div>
              {fetched5 ? (
                <div>
                  <button
                    className="button2"
                    onClick={() => setFetched5(false)}
                  >
                    Hide
                  </button>
                </div>
              ) : (
                <div>
                  <button className="button3" onClick={() => setFetched5(true)}>
                    Show
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {fetched5 ? (
          <div className="data-container">
            <div className="data">
              {data5.map((item) => (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Chain Name</th>
                      <th scope="col">Is Testnet</th>
                      <th scope="col">Chain ID</th>

                      <th scope="col">Label</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.is_testnet ? "True" : "False"}</td>

                      <td>{item.chain_id}</td>
                      <td>{item.label}</td>
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
              <div className="get-chains">Chains statuses</div>
              <div>
                <button className="button1" onClick={fetchChainStatus}>
                  Get Chains statuses
                </button>
              </div>
              {fetched6 ? (
                <div>
                  <button
                    className="button2"
                    onClick={() => setFetched6(false)}
                  >
                    Hide
                  </button>
                </div>
              ) : (
                <div>
                  <button className="button3" onClick={() => setFetched6(true)}>
                    Show
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {fetched6 ? (
          <div className="data-container">
            <div className="data">
              {data6.map((item) => (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Chain Name</th>
                      <th scope="col">Is Testnet</th>
                      <th scope="col">Chain ID</th>

                      <th scope="col">Has Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.is_testnet ? "True" : "False"}</td>

                      <td>{item.chain_id}</td>
                      <td>{item.has_data ? "True" : "False"}</td>
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
