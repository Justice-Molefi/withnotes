"use server";

import OpenAI from "openai";
import Message from "../models/Message";
import Chat from "../models/Chat";
import { Role } from "../models/Role";
import { Tienne } from "next/font/google";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DS_API_KEY,
});


export default async function sendPrompt(userPrompt: string,  id: string, localStorageChats: string) {

  // const localStorageChats = localStorage.getItem("Chats");
  var chats : Chat[] = JSON.parse(localStorageChats!);


  var chat : Chat | undefined = chats.find(chat => chat.id === id);  
  if(!chat) return "Something went wrong, please touch some grass and come back later";

  //is this new chat??
  var isNewChat = chat.summary ? false : true;

  if(isNewChat){
    const generateSummary = "Generate one line summary that summarizes what the user just prompted, on the first line write only the title (no quotes, no markdown) then address the user prompt on subsequent lines";
    const modifiedPrompt = userPrompt + generateSummary;

    const promptMessages : Message[] = chat.messages;
    promptMessages.push({role: Role.User, content : modifiedPrompt})
    const response = await send(promptMessages);

    if(!response) return "Something went wrong, please touch some grass and come back later";

    var {title, originalPromptResponse } = parseTitleAndPrompt(response.choices[0].message.content!);

    chat.summary = title;
    chat.messages.push({role: Role.User, content: userPrompt});
    chat.messages.push({role: Role.Assistant, content: originalPromptResponse})

    storeChats(chats);
    return originalPromptResponse;
  }


  chat.messages.push({role : Role.User, content: userPrompt});
  const response = await send(chat.messages);

  if(!response) return "Something went wrong, please touch some grass and come back later";

  chat.messages.push({role: Role.Assistant, content: response.choices[0].message.content!})
  storeChats(chats);
  return response.choices[0].message.content;

}

function parseTitleAndPrompt(response: string) {
  const lines = response.trim().split("\n");

  const title = lines[0]?.trim() || "";
  const originalPromptResponse = lines.slice(1).join("\n").trim();

  return { title, originalPromptResponse };
}

export async function getAllChats(localStorageChats: string) : Promise<Chat[]> {

  // const storedChats = localStorage.getItem("context");
  if(!localStorageChats) return [];

  const chats : Chat[] = JSON.parse(localStorageChats!);
  return chats;
}


//make request to model api
async function send(messages : any){
  const response = await openai.chat.completions.create({
    messages: messages,
    model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
  });

  return response;
}

//store chat 
function storeChats(chats: Chat[]){
  localStorage.setItem("Chats", JSON.stringify(chats));
}
