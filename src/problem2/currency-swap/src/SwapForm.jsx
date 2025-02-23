import { useState, useEffect } from "react";
import axios from "axios";

// Map ký hiệu token sang tên quốc gia
const tokenToCountry = {
  BLUR: "Blur",
  bNEO: "NEO",
  BUSD: "Binance USD",
  USD: "US Dollar",
  ETH: "Ethereum",
  GMX: "GMX",
  STEVMOS: "Evmos",
  LUNA: "Luna",
  RATOM: "Atom",
  STRD: "Stride",
  EVMOS: "Evmos",
  IBCX: "IBC Index",
  IRIS: "IRISnet",
  ampLUNA: "Amplified Luna",
  KUJI: "Kuji",
  STOSMO: "Staked Osmosis",
  USDC: "USD Coin",
  axlUSDC: "Axelar USD Coin",
  ATOM: "Cosmos",
  STATOM: "Staked Atom",
  OSMO: "Osmosis",
  rSWTH: "Switcheo",
  STLUNA: "Staked Luna",
  LSI: "Liquid Staked Index",
  OKB: "OKB",
  OKT: "OKT",
  SWTH: "Switcheo",
  USC: "USC",
  WBTC: "Wrapped Bitcoin",
  wstETH: "Wrapped stETH",
  YieldUSD: "Yield USD",
  ZIL: "Zilliqa",
};

const SwapForm = () => {
  const [tokens, setTokens] = useState([]);
  const [sourceToken, setSourceToken] = useState("");
  const [targetToken, setTargetToken] = useState("");
  const [amount, setAmount] = useState("");
  const [receivedAmount, setReceivedAmount] = useState(0);

  // Lấy dữ liệu giá từ API
  useEffect(() => {
    axios
      .get("https://interview.switcheo.com/prices.json")
      .then((response) => {
        const latestPrices = response.data.reduce((acc, curr) => {
          if (
            !acc[curr.currency] ||
            new Date(acc[curr.currency].date) < new Date(curr.date)
          ) {
            acc[curr.currency] = curr;
          }
          return acc;
        }, {});

        const validTokens = Object.values(latestPrices)
          .filter((token) => token.price != null)
          .map((token) => ({ symbol: token.currency, price: token.price }));

        setTokens(validTokens);
      })
      .catch((err) => console.error("Error fetching prices:", err));
  }, []);

  // Tính số tiền nhận được
  useEffect(() => {
    if (sourceToken && targetToken && amount && !isNaN(amount)) {
      const sourcePrice = tokens.find((t) => t.symbol === sourceToken)?.price;
      const targetPrice = tokens.find((t) => t.symbol === targetToken)?.price;
      if (sourcePrice && targetPrice) {
        const value = (parseFloat(amount) * sourcePrice) / targetPrice;
        setReceivedAmount(isNaN(value) ? 0 : value.toFixed(4));
      } else {
        setReceivedAmount(0);
      }
    } else {
      setReceivedAmount(0);
    }
  }, [sourceToken, targetToken, amount, tokens]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Currency Swap
      </h1>

      <div className="space-y-4">
        {/* Chọn tiền tệ nguồn (From) */}
        <div className="relative">
          <select
            value={sourceToken}
            onChange={(e) => setSourceToken(e.target.value)}
            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="">From</option>
            {tokens.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {tokenToCountry[token.symbol] || token.symbol}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            {sourceToken && (
              <img
                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${sourceToken}.svg`}
                alt={sourceToken}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/32";
                }}
              />
            )}
          </div>
        </div>

        {/* Nhập số lượng */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          min="0"
        />

        {/* Chọn tiền tệ đích (To) */}
        <div className="relative mt-4">
          <select
            value={targetToken}
            onChange={(e) => setTargetToken(e.target.value)}
            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="">To</option>
            {tokens.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {tokenToCountry[token.symbol] || token.symbol}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            {targetToken && (
              <img
                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${targetToken}.svg`}
                alt={targetToken}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/32";
                }}
              />
            )}
          </div>
        </div>

        {/* Hiển thị kết quả */}
        {targetToken && sourceToken && amount && !isNaN(amount) && (
          <p className="text-center mt-4 text-lg font-semibold text-gray-700 flex justify-center items-center">
            You will receive:{" "}
            <span className="text-blue-600 mx-1">{receivedAmount}</span>
            <img
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${targetToken}.svg`}
              alt={targetToken}
              className="w-6 h-6 rounded-full mx-1"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/32";
              }}
            />
            {tokenToCountry[targetToken] || targetToken}
          </p>
        )}
      </div>
    </div>
  );
};

export default SwapForm;
