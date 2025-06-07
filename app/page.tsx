"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSideBar } from "./components/chat-sidebar";
import MainSection from "./home/mainSection";
import Chat from "./models/Chat";
import styles from "./page.module.css";
import { Role } from "./models/Role";
import sendPrompt from "./home/actions";

export default function Home() {
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [chat, setChat] = useState<Chat>();
  const [allChats, setAllChats] = useState<Chat[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [localStorageChats, setLocalStorageChats] = useState<string>("");

  //load all chats
  useEffect(() => {
    setAllChats(loadChats());
  },[]);

  // useEffect(() => {
  //   localStorage.setItem("Chats", JSON.stringify(allChats));
  // }, [allChats]);

  //when click item, have to update current chat
  useEffect(() => {
    setChat(allChats.find((chat) => chat.id === selectedChatId));
    console.log(selectedChatId);
  }, [selectedChatId]);

  // useEffect(() => {
  //   const chats = localStorage.getItem("Chats");
  //   if (chats) setLocalStorageChats(chats);
  // }, [selectedChatId]);

  // useEffect(() => {
  //   let isCancelled = false;

  //   const fetchData = async () => {
  //     let data = await getAllChats(localStorageChats!);
  //     if (!isCancelled) {
  //       setAllChats(data);
  //       console.log("ONE: " + selectedChatId);
  //       setChat(data.find((chat) => chat.id === selectedChatId));
  //     }
  //   };
  //   fetchData();

  //   return () => {
  //     isCancelled = true;
  //   };
  // }, [selectedChatId, localStorageChats]);

  //when i send prompt
  //- add user prompt to messages of currentChat and update state
  //- when response arrives - append response to Current chat messages and update state
  // - save

  const handleSendPrompt = async () => {
    if (chat) {
      const updatedChat = {
        ...chat,
        messages: [...chat.messages, { role: Role.User, content: prompt }],
      };
      setChat(updatedChat);
      const response = await sendPrompt(prompt, updatedChat);
      if (response) {
        setChat(response);
        setAllChats((prev) => {
          const updatedChats = prev.map(chat => chat.id === response.id ? response : chat);
          save(updatedChats);
          return updatedChats;
        });
      }
    }
  };

  const handleCreateNewChat = () => {
    //create new chat with defaults
    const newChat: Chat = {
      id: crypto.randomUUID(),
      summary: "",
      messages: [],
    };

    //append to allChats (setAllChats), save, update current chat to new chat
    setAllChats((prev) => {
      const updatedChats = [...prev, newChat];
      save(updatedChats);
      return updatedChats;
    });
    //setChat(newChat);
    setSelectedChatId(newChat.id)
  };

  // const handleSendPrompt = async () => {
  //   const response = await sendPrompt(
  //     prompt,
  //     selectedChatId,
  //     localStorageChats
  //   );
  //   if (!response) {
  //     console.error("Something went wrong!!");
  //     return;
  //   }

  //   setAllChats((prev) =>
  //     prev.map((chat) => (chat.id === response.id ? response : chat))
  //   );
  //   setChat(response);
  // };
  //load all chats from local storage once when component mounts
  //from there just update only local vars and trigger re-renders
  //when new chat created - append chat to local var and save to localstorage
  //when menu item clicked update chat, and pass it to relevant comp
  //when sending prompt add user prompt to local var and when response arrives add that too then save to localstorage
  //

  //helper functions
  const loadChats = (): Chat[] => {
    const storedChats = localStorage.getItem("Chats");
    if (!storedChats) return [];

    const parsedChats: Chat[] = JSON.parse(storedChats);
    return parsedChats;
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
