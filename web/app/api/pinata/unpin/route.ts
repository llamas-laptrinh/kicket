import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await axios.delete(
      `https://api.pinata.cloud/pinning/unpin/${body.ipfs}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
        },
      }
    );
    // return Response.json(
    //   {
    //     data: res.data,
    //   },
    //   { status: 200, statusText: 'success' }
    // );
  } catch (error) {
    console.error(error);
    // return Response.json({
    //   error,
    // });
  }
}
