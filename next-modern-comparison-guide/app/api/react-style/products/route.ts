import { NextResponse } from "next/server";
import { getReactStyleLessons } from "../../../../lib/workshop-data";

export async function GET() {
  const payload = await getReactStyleLessons();

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
