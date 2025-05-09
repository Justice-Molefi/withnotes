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
  } from "@/components/ui/sidebar"
import { Delete, Trash} from "lucide-react"
  
  export function ChatSideBar() {
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
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <a>
                                <span>Big Ballzzz</span>
                            </a>
                        </SidebarMenuButton>
                        <SidebarMenuAction>
                            <Trash /> <span className="sr-only">delete project</span>
                        </SidebarMenuAction>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <a>
                                <span>Big Ballzzz</span>
                            </a>
                        </SidebarMenuButton>
                        <SidebarMenuAction>
                            <Trash /> <span className="sr-only">delete project</span>
                        </SidebarMenuAction>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <a>
                                <span>Big Ballzzz</span>
                            </a>
                        </SidebarMenuButton>
                        <SidebarMenuAction>
                            <Trash /> <span className="sr-only">delete project</span>
                        </SidebarMenuAction>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  