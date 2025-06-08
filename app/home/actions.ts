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
  var isNewChat = !chat.summary;
  let summary = "";

  if (isNewChat) {
    const generateSummary = `Summarize the following prompt in one short line. ONLY return the summary, do NOT answer it.

Prompt:
${userPrompt}`;

    const summaryResponse = await send([
      {
        role: Role.User,
        content: generateSummary,
      },
    ]);
    if (!summaryResponse) return null;
    summary = summaryResponse.choices[0].message.content!;
  }

  const assistantResponse = await send(chat.messages);

  if (!assistantResponse) return null;

  const updatedMessages = [...chat.messages];

  //pop removes the loading message, before adding assistant response
  updatedMessages.pop();
  updatedMessages.push({
    role: Role.Assistant,
    content: assistantResponse.choices[0].message.content!,
  });

  const updatedChat = {
    ...chat,
    summary: isNewChat ? summary : chat.summary,
    messages: updatedMessages,
  };

  return updatedChat;
}

//make request to model api
async function send(messages: any) {
  const response = await openai.chat.completions.create({
    messages: messages,
    model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
  });

  return response;
}
