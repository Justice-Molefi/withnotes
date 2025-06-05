"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Delete, PlusIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import simulatedChat from "../mockdata/chats";
import Chat from "../models/Chat";
import { getAllChats } from "../home/actions";

interface SideBarProps {
  handleMenuItemClick : (chatId: string) => void,
  handleNewChat: () => void,
  chats : Chat[]
}

export function ChatSideBar({handleMenuItemClick,handleNewChat, chats}: SideBarProps) {
  // const [userChats, setUserChats] = useState<Chat[]>([]);

  useEffect(() => {
  }, [chats]);


  return (
    <Sidebar>
      <SidebarHeader>
        <div className="name ml-1">Withnotes</div>
        <button
          className="mt-2 flex items-center gap-2 px-3 py-1 text-sm text-white cursor-pointer"
          onClick={() => handleNewChat()}
        >
          <PlusIcon className="h-4 w-4" />
          New Chat
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    className="cursor-pointer"
                    onClick={() => handleMenuItemClick(chat.id)}
                  >
                    <a>
                      <span>{chat.summary ? chat.summary : 'new chat'}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuAction>
                    <Trash /> <span className="sr-only">delete project</span>
                  </SidebarMenuAction>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
