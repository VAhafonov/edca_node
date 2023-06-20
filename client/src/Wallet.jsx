import server from "./server";
import getAddressFromPrivateKey from "./utils";

function Wallet({ private_key, setPrivateKey, address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const private_key = evt.target.value;
    const address = getAddressFromPrivateKey(private_key);
    setPrivateKey(private_key);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input placeholder="Type an private key" value={private_key} onChange={onChange}></input>
      </label>

      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
