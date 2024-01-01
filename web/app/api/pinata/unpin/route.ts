import { NextResponse } from 'next/server';
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
    return NextResponse.json({
      status: 'success',
      statusCode: 200,
      data: res.data,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
