
"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, BrainCircuit, CloudSun, ScanSearch, Spade } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { translations } from "@/lib/i18n";

export default function Dashboard() {
  const { language } = useLanguage();
  const t = translations[language] || translations['English'];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t['dashboard.welcome']}
        </h1>
        <p className="text-muted-foreground">
          {t['dashboard.description']}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <CloudSun className="h-8 w-8 text-accent" />
              <CardTitle>{t['dashboard.weather.title']}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-2">
            <p className="text-4xl font-bold">28°C</p>
            <p className="text-muted-foreground">{t['dashboard.weather.condition']}</p>
            <p className="text-sm text-muted-foreground">
              {t['dashboard.weather.upcoming']}
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
             <div className="flex items-center gap-4">
               <BrainCircuit className="h-8 w-8 text-primary" />
              <CardTitle>{t['dashboard.advisor.title']}</CardTitle>
            </div>
            <CardDescription>
              {t['dashboard.advisor.description']}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              {t['dashboard.advisor.content']}
            </p>
          </CardContent>
          <CardContent>
            <Link href="/crop-advisor">
              <Button className="w-full">
                {t['dashboard.advisor.button']} <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
               <ScanSearch className="h-8 w-8 text-primary" />
              <CardTitle>{t['dashboard.pest.title']}</CardTitle>
            </div>
            <CardDescription>
              {t['dashboard.pest.description']}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              {t['dashboard.pest.content']}
            </p>
          </CardContent>
          <CardContent>
            <Link href="/pest-detection">
              <Button className="w-full">
                {t['dashboard.pest.button']} <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
               <Spade className="h-8 w-8 text-primary" />
              <CardTitle>{t['dashboard.soil.title']}</CardTitle>
            </div>
            <CardDescription>
              {t['dashboard.soil.description']}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              {t['dashboard.soil.content']}
            </p>
          </CardContent>
          <CardContent>
            <Link href="/soil-health">
              <Button className="w-full">
                {t['dashboard.soil.button']} <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
               <Bot className="h-8 w-8 text-primary" />
              <CardTitle>{t['dashboard.chatbot.title']}</CardTitle>
            </div>
            <CardDescription>
             {t['dashboard.chatbot.description']}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              {t['dashboard.chatbot.content']}
            </p>
          </CardContent>
          <CardContent>
            <Link href="/chatbot">
              <Button className="w-full">
                {t['dashboard.chatbot.button']} <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
