"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  BrainCircuit,
  Home,
  ScanSearch,
  Spade,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";

const links = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/crop-advisor", label: "Crop Advisor", icon: BrainCircuit },
  { href: "/pest-detection", label: "Pest Detection", icon: ScanSearch },
  { href: "/soil-health", label: "Soil Health", icon: Spade },
  { href: "/chatbot", label: "Q&A Chatbot", icon: Bot },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="size-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-base font-semibold tracking-tight">
              KrishiSahayak
            </h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <SidebarMenuButton
                  as="a"
                  isActive={pathname === link.href}
                  tooltip={link.label}
                >
                  <link.icon className="size-5" />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
