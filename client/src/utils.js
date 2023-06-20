import * as secp from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

export default function getAddressFromPrivateKey(private_key) {
    const public_key = secp.secp256k1.getPublicKey(private_key);
    const hash = keccak256(public_key.slice(1, public_key.length));
    return toHex(hash.slice(hash.length - 20, hash.length));
}

export function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);
    return toHex(hash);
}

export function signMessage(msg_hash, private_key) {
    const sign = secp.secp256k1.sign(msg_hash, private_key);
    // const temp = sign.recoverPublicKey(hash).toRawBytes(true);
    // alert(toHex(temp));
    return sign;
}

export function signatureToCompact(signature){
    return signature.toCompactHex();
}

export function getRecoveryBitFromSignature(signature){
    return signature.recovery;
}