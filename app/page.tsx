"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSideBar } from "./components/chat-sidebar";
import MainSection from "./home/mainSection";
import Chat from "./models/Chat";
import styles from "./page.module.css";
import { Role } from "./models/Role";
import sendPrompt from "./home/actions";
import { Coins } from "lucide-react";

export default function Home() {
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [chat, setChat] = useState<Chat>();
  const [allChats, setAllChats] = useState<Chat[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [disableSend, setDisableSend] = useState<boolean>(false);
  const [note, setNote] = useState("");
  const [debouncedNote, setDebouncedNote] = useState(note);

  //load all chats
  useEffect(() => {
    const allChats = loadChats();
    setAllChats(allChats);
    if (allChats.length > 0) {
      const lastChat = allChats[0];
      setSelectedChatId(lastChat.id);
    } else {
      handleCreateNewChat();
    }
  }, []);

  //when click item, have to update current chat
  useEffect(() => {
    setChat(allChats.find((chat) => chat.id === selectedChatId));
  }, [selectedChatId]);

  //save note
  useEffect(() => {
    console.log("Saving Note : " + note);
    const timeout = setTimeout(() => {
      if (chat) {
        const updatedChat = {
          ...chat,
          note: note,
        };

        setAllChats((prev) => {
          const updatedChats = prev.map((chat) =>
            chat.id === updatedChat.id ? updatedChat : chat
          );
          save(updatedChats);
          return updatedChats;
        });
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [note]);

  const handleSendPrompt = async () => {
    if (chat) {
      const updatedChat = {
        ...chat,
        messages: [
          ...chat.messages,
          { role: Role.User, content: prompt },
          { role: Role.Assistant, content: "Generating Response..." },
        ],
      };
      const userPrompt = prompt;

      //clear form input
      setPrompt("");
      setDisableSend(true);
      setChat(updatedChat);

      const response = await sendPrompt(userPrompt, updatedChat);
      if (response) {
        setChat(response);
        setAllChats((prev) => {
          const updatedChats = prev.map((chat) =>
            chat.id === response.id ? response : chat
          );
          save(updatedChats);
          return updatedChats;
        });
      }
    }

    setDisableSend(false);
  };

  const handleCreateNewChat = () => {
    //create new chat with defaults
    const newChat: Chat = {
      id: crypto.randomUUID(),
      summary: "",
      messages: [],
      notes: "",
    };

    //append to allChats (setAllChats), save, update current chat to new chat
    setAllChats((prev) => {
      const updatedChats = [...prev, newChat];
      save(updatedChats);
      return updatedChats;
    });

    setSelectedChatId(newChat.id);
  };

  const handleDeleteChat = (id: string) => {
    const updatedChats = allChats.filter((chat) => chat.id !== id);
    save(updatedChats);
    setAllChats(updatedChats);
  };

  //helper functions
  const loadChats = (): Chat[] => {
    const storedChats = localStorage.getItem("Chats");
    if (!storedChats) return [];

    const parsedChats: Chat[] = JSON.parse(storedChats);
    return parsedChats.reverse();
  };

  const save = (chats: Chat[]) => {
    localStorage.setItem("Chats", JSON.stringify(chats));
  };

  return (
    <SidebarProvider>
      <ChatSideBar
        handleMenuItemClick={setSelectedChatId}
        handleNewChat={handleCreateNewChat}
        chats={allChats}
        handleDeleteChat={handleDeleteChat}
      />
      <main className="w-full h-screen flex flex-col">
        <div className="top-bar flex justify-between">
          <SidebarTrigger />
          <div className="w-full py-3 px-52 text-sm">
            <div className="flex justify-start">{chat?.summary}</div>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <MainSection selectedChat={chat!} handleOnChange={setNote} />
        </div>
        <div className={styles.inputContainer}>
          <div>
            <div className={styles.input}>
              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                name=""
                id=""
                value={prompt}
                rows={3}
                placeholder="ask anything, don't be afraid"
              />
            </div>
            <div className="flex justify-between px-1 py-2">
              <select className={styles.models} name="models" id="models">
                <option value="model">deepseek-r1-0528-qwen3-8b</option>
              </select>
              <button
                disabled={
                  prompt && selectedChatId && !disableSend ? false : true
                }
                onClick={handleSendPrompt}
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
