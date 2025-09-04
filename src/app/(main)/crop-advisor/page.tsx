"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getRecommendations } from "./actions";
import type { AICropRecommendationsOutput } from "@/ai/flows/ai-crop-recommendations";
import { Loader2, Trees, Droplets, CalendarDays, BrainCircuit } from "lucide-react";

const formSchema = z.object({
  location: z.string().min(1, "Location is required."),
  soilData: z
    .string()
    .min(1, "Please describe your soil type (e.g., 'sandy', 'loamy')."),
  weatherData: z
    .string()
    .min(1, "Describe typical weather (e.g., 'hot and dry', 'monsoon season')."),
  cropHistory: z
    .string()
    .min(1, "List previous crops (e.g., 'rice, wheat')."),
});

type FormData = z.infer<typeof formSchema>;

export default function CropAdvisorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AICropRecommendationsOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      soilData: "",
      weatherData: "",
      cropHistory: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setResult(null);
    try {
      const recommendation = await getRecommendations(values);
      setResult(recommendation);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>AI Crop Advisor</CardTitle>
          <CardDescription>
            Fill in your farm's details to get personalized crop
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (e.g., Village, District)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Anand, Gujarat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soilData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Type & Condition</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Black soil, good drainage"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weatherData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local Weather Patterns</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Heavy monsoon from June to September"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cropHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous Crops (last 2-3 seasons)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 2023: Cotton, 2022: Groundnut"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Get Recommendations"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center">
        {isLoading && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p>Our AI is thinking... this may take a moment.</p>
          </div>
        )}
        {result && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Your AI-Powered Recommendations</CardTitle>
              <CardDescription>
                Based on the data you provided.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-full border bg-background p-3">
                  <Trees className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Recommended Crop</h3>
                  <p className="text-muted-foreground">
                    {result.cropRecommendation}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-full border bg-background p-3">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Planting Time</h3>
                  <p className="text-muted-foreground">
                    {result.plantingTimeRecommendation}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-full border bg-background p-3">
                  <Droplets className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Water Management</h3>
                  <p className="text-muted-foreground">
                    {result.waterManagementRecommendation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {!isLoading && !result && (
           <Card className="w-full flex flex-col items-center justify-center text-center p-8 border-dashed">
            <CardHeader>
              <CardTitle>Awaiting Your Farm's Details</CardTitle>
              <CardDescription>Your personalized recommendations will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
              <BrainCircuit className="h-24 w-24 text-muted" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
