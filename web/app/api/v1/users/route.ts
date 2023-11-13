import { KicketUser } from "@/app/utils";
import { NextResponse } from "next/server";

const kicketUser = new KicketUser();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  
  if (!address) {
    return NextResponse.json({
      Error: "address not found",
    });
  }

  const data = await kicketUser.getUserByAddress(address);
  return NextResponse.json({
    ...data,
  });
}
export async function POST(request: Request) {
  const body = await request.json();

}
