'use client'

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSideBar } from "./components/chat-sidebar";
import MainSection from "./home/mainSection";

export default function Home() {
  const [selectedChatId, setSelectedChatId] = useState<string>("");

  return (
    <SidebarProvider>
      <ChatSideBar handleMenuItemClick={setSelectedChatId} />
      <main className="w-full h-screen flex flex-col">
        <div className="top-bar">
          <SidebarTrigger />
        </div>
        <div className="flex-1 min-h-0">
          <MainSection selectedChatId={selectedChatId} />
        </div>
      </main>
    </SidebarProvider>
  );
}
