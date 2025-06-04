"use server";

import OpenAI from "openai";
import Message from "../models/Message";
import Chat from "../models/Chat";
import { Role } from "../models/Role";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DS_API_KEY,
});


export default async function sendPrompt(userPrompt: string) {
  let Chat: Chat;
  let isNewChat = false;
  const generateSummary =
    "Generate one line summary that summarizes what the user just prompted, on the first line write only the title (no quotes, no markdown) then address the user prompt on subsequent lines";
  const summaryMessage: Message = {
    role: Role.User,
    content: generateSummary,
  };
  const userMessage: Message = { role: Role.User, content: userPrompt };

  const storedContext = localStorage.getItem("context");
  if (storedContext) {
    Chat = JSON.parse(storedContext);
    Chat.messages.push(userMessage);
  } else {
    isNewChat = true;
    Chat = {
      id: "pampers",
      summary: "",
      messages: [summaryMessage, userMessage],
    };
  }

  const response = await openai.chat.completions.create({
    messages: Chat.messages as any,
    model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
  });

  const { role, content } = response.choices[0].message;

  if (!content)
    return "Something went wrong, please touch some grass and come back later";

  //append prompt response to context
  if (isNewChat) {
    const { title, originalPromptResponse } = parseTitleAndPrompt(content);
    Chat.summary = title;
    Chat.messages.push({
      role: Role.Assistant,
      content: originalPromptResponse,
    });

    localStorage.setItem("context", JSON.stringify(Chat));
    return originalPromptResponse;
  }

  Chat.messages.push({ role: Role.Assistant, content: content });
  console.log("Que Pasa puta: " + content);
  localStorage.setItem("context", JSON.stringify(Chat));
  return content;
}

function parseTitleAndPrompt(response: string) {
  const lines = response.trim().split("\n");

  const title = lines[0]?.trim() || "";
  const originalPromptResponse = lines.slice(1).join("\n").trim();

  return { title, originalPromptResponse };
}

export function getAllChats(id : string) : Message[] {

  const context = localStorage.getItem("context");
  if(!context) return [];

  const chatObj : Chat = JSON.parse(context);

  return chatObj.messages;
}

