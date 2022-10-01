import https from 'https';
import { INFURA_PROJECT_SECRET, INFURA_PROJECT_ID } from "../../constants";


const cid = 'c920...XXX';

const options = {
    host: 'https://greymeta.infura-ipfs.io',
    port: 5001,
    path: `/api/v0/get?arg=$${cid}`,
    method: 'POST',
    auth: INFURA_PROJECT_ID + ':' + INFURA_PROJECT_SECRET,
};

let req = https.request(options, (res) => {
    let body = '';
    res.on('data', function (chunk) {
        body += chunk;
    });
    res.on('end', function () {
        console.log(body);
    });
});
req.end();