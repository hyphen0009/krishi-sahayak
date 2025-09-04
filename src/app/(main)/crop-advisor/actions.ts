"use server";

import {
  aiCropRecommendations,
  type AICropRecommendationsInput,
} from "@/ai/flows/ai-crop-recommendations";
import { z } from "zod";

const CropAdvisorSchema = z.object({
  location: z.string().min(1, "Location is required."),
  soilData: z.string().min(1, "Soil data is required."),
  weatherData: z.string().min(1, "Weather data is required."),
  cropHistory: z.string().min(1, "Crop history is required."),
});

export async function getRecommendations(input: AICropRecommendationsInput) {
  const validatedInput = CropAdvisorSchema.safeParse(input);
  if (!validatedInput.success) {
    throw new Error("Invalid input.");
  }

  try {
    const result = await aiCropRecommendations(validatedInput.data);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get recommendations from AI.");
  }
}
