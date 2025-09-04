// Implemented the Genkit flow for the PestDetectionFromImage story.

'use server';

/**
 * @fileOverview Detects pests or diseases in a crop image and suggests remedies.
 *
 * - detectPests - A function that handles the pest detection process.
 * - DetectPestsInput - The input type for the detectPests function.
 * - DetectPestsOutput - The return type for the detectPests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectPestsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectPestsInput = z.infer<typeof DetectPestsInputSchema>;

const DetectPestsOutputSchema = z.object({
  pestOrDisease: z.string().describe('The identified pest or disease, if any.'),
  remedies: z.string().describe('Suggested remedies for the identified pest or disease.'),
  confidence: z.number().describe('The confidence level of the pest or disease detection (0-1).'),
});
export type DetectPestsOutput = z.infer<typeof DetectPestsOutputSchema>;

export async function detectPests(input: DetectPestsInput): Promise<DetectPestsOutput> {
  return detectPestsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectPestsPrompt',
  input: {schema: DetectPestsInputSchema},
  output: {schema: DetectPestsOutputSchema},
  prompt: `You are an expert in identifying crop pests and diseases.

  Analyze the image of the crop and identify any pests or diseases present. Provide appropriate remedies.

  Photo: {{media url=photoDataUri}}

  Respond with the identified pest or disease (if any), suggested remedies, and a confidence level (0-1).`,
});

const detectPestsFlow = ai.defineFlow(
  {
    name: 'detectPestsFlow',
    inputSchema: DetectPestsInputSchema,
    outputSchema: DetectPestsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
