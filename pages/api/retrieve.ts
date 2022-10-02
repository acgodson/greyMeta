/* eslint-disable import/no-anonymous-default-export */
// import querystring from "querystring";
// import verify from "../../utils/verify_signature";
import type { NextApiRequest, NextApiResponse } from "next";
import sodium from "libsodium-wrappers";
import type { Readable } from "node:stream";
import bs58check from "bs58check";
import https from "https";

const projectId = "1qmt...XXX";
const projectSecret = "c920...XXX";

const options = {
  host: "ipfs.infura.io",
  port: 5001,
  path: "/api/v0/pin/add?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn",
  method: "POST",
  auth: projectId + ":" + projectSecret,
};

const prefix = {
  edsig: new Uint8Array([9, 245, 205, 134, 18]),
  edpk: new Uint8Array([13, 15, 37, 217]),
};

type signature = {
  owner: string; //This should be called from the serverside in production
  key: string;
  bytes: string;
  sig: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function hex2buf(hex: string) {
  return new Uint8Array(
    hex.match(/[\da-f]{2}/gi).map(function (h: string) {
      return parseInt(h, 16);
    })
  );
}

function b58decode(enc: string, prefix: string | any[] | Uint8Array) {
  return bs58check.decode(enc).slice(prefix.length);
}

async function verifyUserSignature(bytes: string, sig: string, pk: string) {
  await sodium.ready;
  try {
    const verify = sodium.crypto_sign_verify_detached(
      b58decode(sig, prefix.edsig),
      sodium.crypto_generichash(32, hex2buf(bytes)),
      b58decode(pk, prefix.edpk)
    );
    console.log("Verify: ", verify);
    return verify;
  } catch (e) {
    console.log("Error: ", e);
    throw e;
  }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  //const address = req.body.owner;
  //console.log(req);
  if (req.method === "POST") {
    const buf = await buffer(req);
    const rawBody = buf.toString("utf8");
    const body: signature = JSON.parse(rawBody);
    console.log(rawBody);

    // const _curve = String(curve);

    // const publicKeyHash = b58cencode(
    //   sodium.crypto_generichash(20, body.key),
    //   pref.sp.pkh
    // );
    // if (publicKeyHash != body.owner) {
    //   console.log("Not the same address");
    //   return false;
    // }

    const verifySignature = verifyUserSignature(body.bytes, body.sig, body.key);


    return res.status(200).json({ Data: verifySignature });
  }
}
