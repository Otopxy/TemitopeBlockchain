//let EC = require('elliptic').ec,
    import EC from 'elliptic'
    //fs = require('fs');
    import fs from "fs";

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);


//var wallet;

const ec = EC.ec('secp256k1'),
//const ec = new EC('secp256k1'),
    privateKeyLocation = __dirname + '/wallet/private_key';

//exports.initWallet = () => {
let initWallet = () => {
    let privateKey;
    if (fs.existsSync(privateKeyLocation)) {
        const buffer = fs.readFileSync(privateKeyLocation, 'utf8');
        privateKey = buffer.toString();
    } else {
        privateKey = generatePrivateKey();
        fs.writeFileSync(privateKeyLocation, privateKey);
    }

    const key = ec.keyFromPrivate(privateKey, 'hex');
    const publicKey = key.getPublic().encode('hex');
    return({'privateKeyLocation': privateKeyLocation, 'publicKey': publicKey});
};



const generatePrivateKey = () => {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
};
let wallet = this;
//
export default wallet = {initWallet};
//
let retVal = wallet.initWallet();
console.log(JSON.stringify(retVal));

//export default wallet;

