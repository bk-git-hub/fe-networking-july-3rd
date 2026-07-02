"use server";

import { updateTag } from "next/cache";
import { addServerNote } from "../lib/workshop-data";

export async function addNextNote(formData: FormData) {
  const rawText = formData.get("note");
  const text = typeof rawText === "string" ? rawText.trim() : "";

  if (!text) {
    return;
  }

  addServerNote(text);
  updateTag("notes");
}
