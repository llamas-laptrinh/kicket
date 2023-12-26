import { PINATA_API_KEY, getPinataUri } from "@/app/api/config";
import { KicketNFT } from "@/app/utils";
import axios from "axios";
import { NextResponse } from "next/server";

const kicketNFT = new KicketNFT();

export async function GET(request: Request) {
  return NextResponse.json({
    hello: "hello",
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { address, name, description } = body;
  const metaData = kicketNFT.generateMetadata(name, description);
  console.log(metaData);

  try {
    // const res = await axios.post(
    //   "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    //   {
    //     pinataContent: metaData,
    //     pinataMetadata: {
    //       name: body.name,
    //     },
    //   },
    //   {
    //     headers: {
    //       accept: "application/json",
    //       "content-type": "application/json",
    //       Authorization: `Bearer ${PINATA_API_KEY}`,
    //     },
    //   }
    // );

    // const metaDataURI = getPinataUri(res.data.data.IpfsHash);
    const metaDataURI =
      "https://lavender-cautious-ant-106.mypinata.cloud/ipfs/QmVT8b9hYtKYE7Eesjt3KDXJm11fqCbkJAoXgU3DKB7XtR?pinataGatewayToken=hmcS97lnQbaQI8TIiAmLLpF7cRxrPDWW2N1KsMTqsE5SsKdG74eyTqqBKk4wTfME";

    console.log("metaDataURI", metaDataURI);

    const result = await kicketNFT.mintNFT(address, metaDataURI);

    // ContractTransactionReceipt {
    //   provider: JsonRpcProvider {},
    //   to: '0xA7276563D4a8C229DeE9c91B62D0EE5FAc453e8b',
    //   from: '0x8b414d1401701db36bA84d0c81E426c0b03Af57C',
    //   contractAddress: null,
    //   hash: '0x3f7cb499113ec7fd1f879333d5c47af1da8dff0ae327c47d293259dced2cbc74',
    //   index: 0,
    //   blockHash: '0x2b68188eff91137e70cea660c4bbac4eb142689195e16d22ed187449b39ec396',
    //   blockNumber: 139256846,
    //   logsBloom: '0x04000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004008000000000000000000000000000000000000000000000000020000200000000000000800000000000000000000000010000000000000000000000000000000000000000000000000100000000000000000800000000008000000000000000100000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000001008000000000000000000000',
    //   gasUsed: 242823n,
    //   cumulativeGasUsed: 242823n,
    //   gasPrice: 25000000000n,
    //   type: 2,
    //   status: 1,
    //   root: undefined
    // }

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      data: metaDataURI,
    });

  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
