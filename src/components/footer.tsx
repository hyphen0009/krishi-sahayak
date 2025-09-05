import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">KrishiSahayak</h3>
            <p className="text-muted-foreground max-w-md">
              AI-powered agricultural advisor helping farmers with crop recommendations, 
              pest detection, and farming guidance in multiple languages.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect with me</h4>
            <div className="flex space-x-4">
              <Link 
                href="https://twitter.com/login" 
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full border border-border hover:border-primary"
                title="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://linkedin.com/in/login" 
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full border border-border hover:border-primary"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link 
                href="https://github.com/hyphen009" 
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full border border-border hover:border-primary"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href="zaid.imam.951@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full border border-border hover:border-primary"
                title="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            Made in India • Created by Mohammad Zaid
          </p>
        </div>
      </div>
    </footer>
  );
}
