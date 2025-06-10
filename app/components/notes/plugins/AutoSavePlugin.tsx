import { useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import { Note } from "@/app/models/Note";
import { Joan } from "next/font/google";

export default function AutoSavePlugin({
  selectedChatId,
}: {
  selectedChatId: string;
}) {
  const [editor] = useLexicalComposerContext();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [noteContent, setNoteContent] =
    useState<SerializedEditorState<SerializedLexicalNode>>();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        editorState.read(() => {
          const content = editor.getEditorState().toJSON();
          setNoteContent(content);
          console.log("Content::" + content.root);
          console.log("Auto-saved at::", new Date().toLocaleTimeString());
        });
      }, 2000);
    });
  }, [editor]);

  useEffect(() => {
    SaveNote();
  }, [noteContent]);

  const SaveNote = () => {
    let allNotes = loadNotes();

    if (allNotes) {
      const newNote = allNotes.find((note) => note.id === selectedChatId);
      if (newNote) {
        console.log("Note Found!!" + newNote.content.root);
        const updatedNote: Note = {
          ...newNote,
          content: noteContent!,
        };

        allNotes = [...allNotes, updatedNote];
        console.log(allNotes);
        localStorage.setItem("Notes", JSON.stringify(allNotes));
        return;
      }

      const Note: Note = {
        id: selectedChatId,
        content: noteContent!,
      };

      allNotes = [];
      allNotes.push(Note);

      localStorage.setItem("Notes", JSON.stringify(allNotes));
      return;
    }
  };

  //to update the note that I need
  const loadNotes = (): Note[] => {
    const notes = localStorage.getItem("Notes");

    if (notes) {
      const parsedNotes = JSON.parse(notes);
      return parsedNotes;
    }

    return [];
  };

  return null;
}
