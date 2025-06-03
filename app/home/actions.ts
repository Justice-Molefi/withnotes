"use server";

// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";
import Message from "../models/Message";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DS_API_KEY,
});

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "deepseek-chat",
//   });

//   console.log(completion.choices[0].message.content);
// }

// main();

export default async function sendPrompt() {
  //load prev messages && append new message
  let messages: any = [
    { role: "user", content: "What's the highest mountain in the world?" },
    {
      role: "assistant",
      content: "The highest mountain in the world is Mount Everest.",
    },
    { role: "user", content: "What is the second?" },
  ];

  const response = await openai.chat.completions.create({
    messages: messages,
    model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
  });

  console.log("Fucking cock")
  console.log("BroOoo: " + response.choices[0].message);
  //append model message to local messages
  messages.push(response.choices[0].message);
  console.log("All the shit: " + messages);
  messages.forEach((message: Message) => {
    console.log("role: " + message.role + "content: " + message.content)
  });
}
