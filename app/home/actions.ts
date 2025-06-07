"use server";

import OpenAI from "openai";
import Message from "../models/Message";
import Chat from "../models/Chat";
import { Role } from "../models/Role";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DS_API_KEY,
});

export default async function sendPrompt(
  userPrompt: string,
  chat: Chat
): Promise<Chat | null> {
  if (!chat) return null;
  
  //is this new chat??
  var isNewChat = chat.summary ? false : true;

  if (isNewChat) {
    const generateSummary = "generate a one line summary (just respond with only the summary nothing else!) for this prompt: " + userPrompt;
    const summaryResponse = await send([
      {
        role: Role.User,
        content: generateSummary,
      },
    ]);
    if (!summaryResponse) return null;
    chat.summary = summaryResponse.choices[0].message.content!;
  }

  const userPromptResponse = await send(chat.messages);

  if (!userPromptResponse) return null;
  chat.messages.push({
    role: Role.Assistant,
    content: userPromptResponse.choices[0].message.content!,
  });

  return chat;
}

// function parseTitleAndPrompt(response: string) {
//   const lines = response.trim().split("\n");

//   const title = lines[0]?.trim() || "";
//   const originalPromptResponse = lines.slice(1).join("\n").trim();

//   return { title, originalPromptResponse };
// }

// export async function getAllChats(localStorageChats: string): Promise<Chat[]> {
//   if (!localStorageChats) return [];

//   const chats: Chat[] = JSON.parse(localStorageChats);
//   return chats;
// }

//make request to model api
async function send(messages: any) {
  const response = await openai.chat.completions.create({
    messages: messages,
    model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
  });

  return response;
}

//store chat
// function storeChats(chats: Chat[]){
//   localStorage.setItem("Chats", JSON.stringify(chats));
// }
