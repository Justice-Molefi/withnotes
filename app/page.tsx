import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Notes from "./components/notes/Notes";


//font-[family-name:var(--font-geist-mono)]
//font-[family-name:var(--font-geist-sans)]
//   <PanelLeftOpen />

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-mono)] w-full h-[calc(100vh-36px)] flex">
       <div className="chat text-gray-300 px-2 flex flex-col w-full h-full">
        <div className="user text-sm p-3 self-end bg-black rounded-sm">
          <p>Some bullshit</p>
        </div>
        <div className="llm">
          <p>Some llm bullshit more grabage</p>
        </div>
       </div>
       <div className="notes h-full border-l-2">
        <Notes />
       </div>
    </div>
  );
}
