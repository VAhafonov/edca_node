const secp = require("ethereum-cryptography/secp256k1");
const { toHex  } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const hash = keccak256(publicKey.slice(1, publicKey.length));
    return hash.slice(hash.length - 20, hash.length);
}

const private_key = secp.secp256k1.utils.randomPrivateKey();
const public_key = secp.secp256k1.getPublicKey(private_key);

console.log('private_key:', toHex(private_key));
console.log('public_key:', toHex(public_key))
console.log('address:', toHex(getAddress(public_key)));