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
import { PlusIcon, Trash } from "lucide-react";
import Chat from "../models/Chat";

interface SideBarProps {
  handleMenuItemClick : (chatId: string) => void,
  handleNewChat: () => void,
  isSaving : boolean,
  handleDeleteChat: (id : string) => void,
  chats : Chat[]
}

export function ChatSideBar({handleMenuItemClick, isSaving, handleNewChat,handleDeleteChat, chats}: SideBarProps) {
  const handleMenuItemClickWrapper = (id : string) => {
    if(!isSaving){
      handleMenuItemClick(id);
      return;
    }
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="name ml-1">Withnotes</div>
        <button
          className="mt-2 flex items-center gap-2 px-3 py-1 text-sm textite cursor-pointer"
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
                    className="cursor-pointer flex-1 overflow-hidden"
                    onClick={() => handleMenuItemClickWrapper(chat.id)}
                  >
                    <a className="block overflow-hidden">
                      <span className="truncate block max-w-full text-xs">{chat.summary ? chat.summary : 'new chat'}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuAction onClick={() => handleDeleteChat(chat.id)}>
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
