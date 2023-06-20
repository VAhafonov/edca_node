import { useState } from "react";
import server from "./server";
import * as crypto_utils from "./utils";

function Transfer({ private_key, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const hash = crypto_utils.hashMessage("Send " + toString(sendAmount) + " to " + toString(recipient));
    let signature = crypto_utils.signMessage(hash, private_key);
    const recovery_bit = crypto_utils.getRecoveryBitFromSignature(signature);
    signature = crypto_utils.signatureToCompact(signature);

    const {
      data: { balance },
    } = await server.post(`send`, {
      hash: hash,
      signature: signature,
      recovery_bit: recovery_bit,
      amount: parseInt(sendAmount),
      recipient: recipient,
    });
    setBalance(balance);

    // try {
    //   const {
    //     data: { balance },
    //   } = await server.post(`send`, {
    //     signature: crypto_utils.signMessage("Send", private_key),
    //     amount: parseInt(sendAmount),
    //     recipient,
    //   });
    //   setBalance(balance);
    // } catch (ex) {
    //   alert(ex.response.data.message);
    // }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
