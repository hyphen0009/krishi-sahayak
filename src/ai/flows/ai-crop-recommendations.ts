// This is an AI-powered flow that provides crop recommendations to farmers.
'use server';

/**
 * @fileOverview An AI agent that recommends crop selection, planting times, and water management.
 *
 * - aiCropRecommendations - A function that handles the crop recommendation process.
 * - AICropRecommendationsInput - The input type for the aiCropRecommendations function.
 * - AICropRecommendationsOutput - The return type for the aiCropRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICropRecommendationsInputSchema = z.object({
  location: z.string().describe('The location of the farm.'),
  soilData: z.string().describe('The soil data of the farm.'),
  weatherData: z.string().describe('The weather data of the farm.'),
  cropHistory: z.string().describe('The crop history of the farm.'),
});
export type AICropRecommendationsInput = z.infer<typeof AICropRecommendationsInputSchema>;

const AICropRecommendationsOutputSchema = z.object({
  cropRecommendation: z.string().describe('The recommended crop for the farm.'),
  plantingTimeRecommendation: z.string().describe('The recommended planting time for the farm.'),
  waterManagementRecommendation: z.string().describe('The recommended water management for the farm.'),
});
export type AICropRecommendationsOutput = z.infer<typeof AICropRecommendationsOutputSchema>;

export async function aiCropRecommendations(input: AICropRecommendationsInput): Promise<AICropRecommendationsOutput> {
  return aiCropRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCropRecommendationsPrompt',
  input: {schema: AICropRecommendationsInputSchema},
  output: {schema: AICropRecommendationsOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the location, soil data, weather data, and crop history, provide recommendations for crop selection, planting times, and water management.

Location: {{{location}}}
Soil Data: {{{soilData}}}
Weather Data: {{{weatherData}}}
Crop History: {{{cropHistory}}}

Consider all these factors carefully. Recommend the best crop, planting time and the water management practice.
`,
});

const aiCropRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiCropRecommendationsFlow',
    inputSchema: AICropRecommendationsInputSchema,
    outputSchema: AICropRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
