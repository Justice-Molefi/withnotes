import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSideBar } from "./components/chat-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "With Notes",
  description: "Add notes to your llm chats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased dark font-[family-name:var(--font-geist-mono)] ml-3`}>
        <SidebarProvider>
          <ChatSideBar />
          <main className="w-full h-screen flex flex-col">
            <div className="top-bar">
              <SidebarTrigger />
            </div>
            <div className="flex-1 min-h-0">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
