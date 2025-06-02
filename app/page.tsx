"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSideBar } from "./components/chat-sidebar";
import MainSection from "./home/mainSection";
import Chat from "./models/Chat";
import simulatedChat from "./mockdata/chats";

export default function Home() {
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [chat, setChat] = useState<Chat>();

  useEffect(() => {
    setChat(simulatedChat.find((chat) => chat.id === selectedChatId));
  }, [selectedChatId]);

  return (
    <SidebarProvider>
      <ChatSideBar handleMenuItemClick={setSelectedChatId} />
      <main className="w-full h-screen flex flex-col">
        <div className="top-bar flex justify-between">
          <SidebarTrigger />
          <div className="w-full py-3 px-52">
            <div className="flex justify-start">{chat?.summary}</div>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <MainSection selectedChat={chat!} />
        </div>
        <div className="py-0.5">
          <div>
            <input type="text" name="" id="" />
            <div className="flex justify-between">
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
              <button>Send</button>
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
