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
