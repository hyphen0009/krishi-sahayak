"use server";

import { detectPests } from "@/ai/flows/pest-detection-from-image";

export async function detectPestFromImage(photoDataUri: string) {
  if (!photoDataUri || !photoDataUri.startsWith("data:image/")) {
    throw new Error("Invalid image data provided.");
  }

  try {
    const result = await detectPests({ photoDataUri });
    return result;
  } catch (error) {
    console.error("Pest detection failed:", error);
    throw new Error("Failed to analyze the image with AI.");
  }
}
