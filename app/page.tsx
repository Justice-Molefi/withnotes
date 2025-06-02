"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSideBar } from "./components/chat-sidebar";
import MainSection from "./home/mainSection";
import Chat from "./models/Chat";
import simulatedChat from "./mockdata/chats";
import styles from "./page.module.css";

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
        <div className={styles.inputContainer}>
          <div>
            <div className={styles.input}>
              <textarea name="" id="" rows={3} placeholder="ask anything, don't be afraid"/>
            </div>
            <div className="flex justify-between px-1 py-2">
              <select className={styles.models} name="models" id="models">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
              <button className={styles.sendButton}>Send</button>
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
