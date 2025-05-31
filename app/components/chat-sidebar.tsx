'use client'

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
import { Delete, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import simulatedChat from "../mockdata/chats";
import Chat from "../models/Chat";

export function ChatSideBar({ handleMenuItemClick } : {handleMenuItemClick : (chatId : string) => void}) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    setChats(simulatedChat);
  }, []);
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="name ml-1">Withnotes</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton onClick={() => handleMenuItemClick(chat.id)}>
                    <a>
                      <span>{chat.summary}</span>
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
