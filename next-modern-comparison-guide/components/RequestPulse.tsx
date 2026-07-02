import { connection } from "next/server";
import { wait } from "../lib/workshop-data";

export async function RequestPulse() {
  await connection();
  await wait(900);

  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return <b>{time}에 streamed</b>;
}
