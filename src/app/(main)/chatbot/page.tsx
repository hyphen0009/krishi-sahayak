"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendMessage } from "./actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Bot,
  Loader2,
  Mic,
  MicOff,
  Send,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

type Message = {
  role: "user" | "model";
  content: string;
};

const formSchema = z.object({
  query: z.string().min(1, "Message is required."),
});

type FormData = z.infer<typeof formSchema>;

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: "" },
  });

  const handleMicClick = () => {
    if (isListening) {
      speechRecognitionRef.current?.stop();
      setIsListening(false);
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      speechRecognitionRef.current = new (window as any).webkitSpeechRecognition();
      speechRecognitionRef.current.continuous = false;
      speechRecognitionRef.current.interimResults = false;
      speechRecognitionRef.current.lang = language; // Use selected language

      speechRecognitionRef.current.onstart = () => {
        setIsListening(true);
      };
      speechRecognitionRef.current.onend = () => {
        setIsListening(false);
      };
      speechRecognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        form.setValue("query", transcript);
        form.handleSubmit(handleSubmit)(); // Automatically submit
      };
      speechRecognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event);
        let errorDescription = "An unknown error occurred during voice recognition.";
        if (event.error === 'no-speech') {
          errorDescription = "No speech was detected. Please try again.";
        } else if (event.error === 'audio-capture') {
          errorDescription = "Audio capture failed. Please check your microphone.";
        } else if (event.error === 'not-allowed') {
          errorDescription = "Microphone access was denied. Please allow microphone access in your browser settings.";
        }
        toast({
            variant: "destructive",
            title: "Voice Error",
            description: errorDescription,
        });
        setIsListening(false);
      };
      
      speechRecognitionRef.current.start();
    } else {
      toast({
        variant: "destructive",
        title: "Unsupported Browser",
        description: "Voice recognition is not supported in your browser. Please try Chrome or Safari.",
      });
    }
  };


  const handleSubmit = async (values: FormData) => {
    const currentQuery = values.query;
    if (!currentQuery) return;

    setIsLoading(true);
    const userMessage: Message = { role: "user", content: currentQuery };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    try {
      const result = await sendMessage({
        history: messages, // Send previous messages for context
        query: currentQuery,
        language: language,
      });

      setMessages((prev) => [
        ...prev,
        { role: "model", content: result.response },
      ]);

      if (result.audio && !isMuted) {
        const audio = new Audio(result.audio);
        audio.play().catch(e => console.error("Audio playback failed", e));
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unknown error occurred.",
      });
       // If AI fails, keep user's message in the chat history
       setMessages((prev) => {
         const lastMessage = prev[prev.length - 1];
         // Only add the thinking indicator if it's not already there
         if(lastMessage.role !== 'model'){
            return prev;
         }
         return prev.slice(0, -1);
       });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <Card className="flex-grow flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>KrishiSahayak Chat</CardTitle>
            <CardDescription>
              Your AI assistant for agricultural questions. Ask in any language.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
             <Button
                variant="outline"
                size="icon"
                onClick={() => setIsMuted((prev) => !prev)}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {isMuted ? "Unmute" : "Mute"}
                </span>
              </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="space-y-6 pr-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.role === "model" && (
                    <Avatar>
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-3 max-w-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <Avatar>
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-3 bg-muted">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardContent className="border-t pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex items-center gap-2"
            >
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ask a question in any language..."
                        className="flex-grow"
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                size="icon"
                variant={isListening ? "destructive" : "outline"}
                onClick={handleMicClick}
                disabled={isLoading}
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {isListening ? "Stop Listening" : "Start Listening"}
                </span>
              </Button>
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
