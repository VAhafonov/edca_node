const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const hash = keccak256(publicKey.slice(1, publicKey.length));
    return hash.slice(hash.length - 20, hash.length);
}

function getAddressFromSignature(signature_compact, msg_hash, recovery_bit){
    let signature = secp.secp256k1.Signature.fromCompact(signature_compact);
    signature = signature.addRecoveryBit(recovery_bit);
    const public_key = signature.recoverPublicKey(msg_hash).toRawBytes(true);
    return toHex(getAddress(public_key));
}

module.exports = getAddressFromSignature;