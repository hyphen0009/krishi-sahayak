"use server";

import { chat, type ChatInput } from "@/ai/flows/chatbot";

export async function sendMessage(input: ChatInput) {
  try {
    const result = await chat(input);
    return result;
  } catch (error) {
    console.error("Chatbot action failed:", error);
    throw new Error("Failed to get a response from the AI.");
  }
}
