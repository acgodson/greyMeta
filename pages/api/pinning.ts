import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "node:stream/consumers";
import { create } from "ipfs-http-client";
import { INFURA_PROJECT_ID } from "../../constants";
import { INFURA_PROJECT_SECRET } from "../../constants";

const auth =
  "Basic " +
  Buffer.from(INFURA_PROJECT_ID + ":" + INFURA_PROJECT_SECRET).toString(
    "base64"
  );

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const buf = await buffer(req);
      const rawBody = buf.toString("utf8");
      const body: any = JSON.parse(rawBody);
      console.log(rawBody);

      if (!body.cid) {
        res.status(500).json({ status: false, msg: "no content provided" });
      } else {
        const filePath = body.cid;
        const client = ipfsNode();
        //pin the contract metadata to ipfs, the same hash would be used to store contents offfchain
        const pinnedData = await client.pin.add(filePath);

        if (pinnedData) {
          // pins metadata object
          // const metadataOBj = {
          //   name: body.title,
          //   description: body.description,
          //   symbol: "TUT",
          //   artifactUri: `ipfs://${pinnedFile}`,
          //   displayUri: `ipfs://${pinnedFile}`,
          //   creators: [body.creator],
          //   decimals: 0,
          //   thumbnailUri: "https://tezostaquito.io/img/favicon.png",
          //   is_transferable: true,
          //   shouldPreferSymbol: false,
          // };

          console.log(pinnedData);

          // res.status(200).json({
          //   status: true,
          //   msg: {
          //     metadataHash: pinnedData,
          //   },
          // });
        } else {
          res
            .status(500)
            .json({ status: false, msg: "metadata was not pinned" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: "error pinning to ipfs" });
  }
}
