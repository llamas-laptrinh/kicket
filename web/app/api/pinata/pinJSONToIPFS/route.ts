import Server from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      {
        pinataContent: {
          name: body.name,
          description: body.description,
          image: body.image,
          external_url: body.external_url,
          attributes: body.attributes,
        },
        pinataMetadata: {
          name: body.name,
        },
      },
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
        },
      }
    );
    return Server.NextResponse.json({
      status: 'success',
      statusCode: 200,
      data: res.data,
    });
  } catch (error) {
    return Server.NextResponse.json({
      error,
    });
  }
}
