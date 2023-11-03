import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    hello: "hello",
  });
}
export async function POST(request: Request) {
  return NextResponse.json({
    status: "success",
    statusCode: 200,
  });
}
