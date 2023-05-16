import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log(req);

  return NextResponse.json({});
}