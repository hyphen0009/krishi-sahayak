"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Globe, Mic } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const languages = [
  { value: "English", label: "English" },
  { value: "हिन्दी", label: "हिन्दी" },
  { value: "தமிழ்", label: "தமிழ்" },
  { value: "తెలుగు", label: "తెలుగు" },
  { value: "Español", label: "Español" },
  { value: "Français", label: "Français" },
];

export function Header() {
  const { setLanguage } = useLanguage();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-lg font-semibold md:text-xl">KrishiSahayak</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Globe className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Select Language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.value}
                onSelect={() => setLanguage(lang.value)}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/chatbot">
          <Button variant="outline" size="icon">
            <Mic className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Voice Interaction</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
