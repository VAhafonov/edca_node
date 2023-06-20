const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const getAddressFromSignature = require("./scripts/utils")

app.use(cors());
app.use(express.json());

const balances = {
  "2220459e4f4689931fe72a50259f98e2bb0246c3": 100,
  "c3fb23601934bc2dd12853077322c76e38d1bd83": 50,
  "15a6f556958d71f437e273e249228408b7529a4a": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const payload = req.body;
  
  const sender = getAddressFromSignature(payload.signature, payload.hash, payload.recovery_bit);
  const recipient = payload.recipient;
  const amount = payload.amount;
  
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
