import { connection } from "next/server";
import { ClientFetchCacheCard } from "./ClientFetchCacheCard";

export async function ClientFetchCacheSlot() {
  await connection();

  return <ClientFetchCacheCard runId={Date.now().toString()} />;
}
