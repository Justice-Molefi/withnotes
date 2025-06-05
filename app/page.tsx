"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSideBar } from "./components/chat-sidebar";
import MainSection from "./home/mainSection";
import Chat from "./models/Chat";
import styles from "./page.module.css";
import sendPrompt, { getAllChats } from "./home/actions";

export default function Home() {
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [chat, setChat] = useState<Chat>();
  const [allChats, setAllChats] = useState<Chat[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [localStorageChats, setLocalStorageChats] = useState<string>("");

  useEffect(() => {
    let isCancelled = false;
    setLocalStorageChats(localStorage.getItem("Chats")!);
    const fetchData = async () => {
      let data = await getAllChats(localStorageChats!);
      if (!isCancelled) {
        setAllChats(data);
        setChat(data.find((chat) => chat.id === selectedChatId));
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [selectedChatId, allChats]);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      summary: "",
      messages: [],
    };
    let chats: Chat[] = allChats;

    // if (!localStorageChats) {
    //   return;
    // }

    chats.push(newChat);
    localStorage.setItem("Chats", JSON.stringify(chats));
    setAllChats(chats);
  };

  return (
    <SidebarProvider>
      <ChatSideBar
        handleMenuItemClick={setSelectedChatId}
        handleNewChat={handleNewChat}
        chats={allChats}
      />
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
              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                name=""
                id=""
                rows={3}
                placeholder="ask anything, don't be afraid"
              />
            </div>
            <div className="flex justify-between px-1 py-2">
              <select className={styles.models} name="models" id="models">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
              <button
                disabled={prompt && selectedChatId ? false : true}
                onClick={() =>
                  sendPrompt(prompt, selectedChatId, localStorageChats)
                }
                className={styles.sendButton}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
