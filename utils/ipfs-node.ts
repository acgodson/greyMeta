import ipfsClient from "ipfs-http-client";
import { INFURA_PROJECT_ID } from "../constants";
import { INFURA_PROJECT_SECRET } from "../constants";
import { create } from "ipfs-http-client";

const auth =
  "Basic " +
  Buffer.from(INFURA_PROJECT_ID + ":" + INFURA_PROJECT_SECRET).toString(
    "base64"
  );

// client.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
//     console.log(res);
// });

const ipfsNode = () => {
  return create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
};

export default ipfsNode;
