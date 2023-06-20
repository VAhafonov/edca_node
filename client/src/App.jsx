import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [private_key, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");


  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        private_key={private_key}
        setPrivateKey={setPrivateKey}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} private_key={private_key} />
    </div>
  );
}

export default App;
