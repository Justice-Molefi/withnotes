import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Notes from "./components/notes";

//font-[family-name:var(--font-geist-mono)]
//font-[family-name:var(--font-geist-sans)]
//   <PanelLeftOpen />

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-mono)] w-full flex">
       <div className="chat flex flex-col w-full">
        <div className="user p-2 self-end bg-gray-600 rounded-sm">
          <p>Some bullshit</p>
        </div>
        <div className="llm">
          <p>Some llm bullshit more grabage</p>
        </div>
       </div>
       <div className="notes">
        <Notes />
       </div>
    </div>
  );
}
