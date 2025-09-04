"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { detectPestFromImage } from "./actions";
import { Loader2, Upload, Bug, ShieldCheck, Percent, ScanSearch } from "lucide-react";
import type { DetectPestsOutput } from "@/ai/flows/pest-detection-from-image";
import { Progress } from "@/components/ui/progress";

export default function PestDetectionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectPestsOutput | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dataUri, setDataUri] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResult(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!dataUri) {
      toast({
        variant: "destructive",
        title: "No Image",
        description: "Please select an image file first.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    try {
      const detectionResult = await detectPestFromImage(dataUri);
      setResult(detectionResult);
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
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Image-Based Pest Detection</CardTitle>
          <CardDescription>
            Upload a photo of an affected crop to identify pests or diseases.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="crop-image">Crop Image</Label>
            <Input
              id="crop-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose an Image
            </Button>
          </div>
          {previewUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              <Image
                src={previewUrl}
                alt="Crop preview"
                fill
                className="object-cover"
                data-ai-hint="crop plant"
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={isLoading || !dataUri}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Image...
              </>
            ) : (
              "Detect Pest"
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-center">
        {isLoading && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p>Our AI is analyzing the image...</p>
          </div>
        )}
        {result && previewUrl && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Detection Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full border-4 border-card-foreground/10">
                <Image
                  src={previewUrl}
                  alt="Analyzed crop"
                  fill
                  className="object-cover"
                   data-ai-hint="crop disease"
                />
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-full border bg-background p-3">
                  <Bug className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold">Pest/Disease Identified</h3>
                  <p className="text-muted-foreground">{result.pestOrDisease}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-full border bg-background p-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Suggested Remedies</h3>
                  <p className="text-muted-foreground">{result.remedies}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold">
                        <Percent className="h-4 w-4" />
                        Confidence
                    </div>
                    <span>{Math.round(result.confidence * 100)}%</span>
                </div>
                <Progress value={result.confidence * 100} />
              </div>
            </CardContent>
          </Card>
        )}
        {!isLoading && !result && (
           <Card className="w-full flex flex-col items-center justify-center text-center p-8 border-dashed">
            <CardHeader>
              <CardTitle>Awaiting Image</CardTitle>
              <CardDescription>Your pest analysis results will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScanSearch className="h-24 w-24 text-muted" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
