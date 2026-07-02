import { NextResponse } from "next/server";
import { getClientCacheDemo } from "../../../../lib/workshop-data";

export async function GET() {
  const payload = await getClientCacheDemo();

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
