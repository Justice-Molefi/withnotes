import { useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $convertFromMarkdownString } from "@lexical/markdown";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { Note } from "@/app/models/Note";

interface SyncProps {
  selectedChatId: string;
  handleIsSaving: (isSaving: boolean) => void;
}
export function SyncNotesPlugin({ selectedChatId, handleIsSaving }: SyncProps) {
  const [editor] = useLexicalComposerContext();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [noteContent, setNoteContent] = useState<string>();
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);

  //loading
  useEffect(() => {
    setContentLoaded(false);
    if (!selectedChatId) return;
    resetEditor();
    const notes = localStorage.getItem("Notes");
    if (notes) {
      const parsedNotes: Note[] = JSON.parse(notes);
      const currentChatNotes = parsedNotes.find(
        (note) => note.id === selectedChatId
      );
      if (currentChatNotes) {
        editor.update(() => {
          $convertFromMarkdownString(currentChatNotes.content, TRANSFORMERS);
        });
      } else {
        SaveNote();
      }
    }
    //content loaded
    setContentLoaded(true);
  }, [selectedChatId]);

  //saving
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        editorState.read(() => {
          const content = $convertToMarkdownString(TRANSFORMERS);
          setNoteContent(content);
        });
      }, 100);
    });
  }, [editor]);

  useEffect(() => {
    if (contentLoaded) SaveNote();
  }, [noteContent]);

  //helper methods
  const SaveNote = () => {
    const allNotes = loadNotes();
    if (allNotes) {
      handleIsSaving(true);
      const newNote = allNotes.find((note) => note.id === selectedChatId);
      if (newNote) {
        newNote.content = noteContent!;
        localStorage.setItem("Notes", JSON.stringify(allNotes));
        handleIsSaving(false);
        return;
      }

      const Note: Note = {
        id: selectedChatId,
        content: noteContent!,
      };

      allNotes.push(Note);
      localStorage.setItem("Notes", JSON.stringify(allNotes));
      console.log("Auto-saved at::", new Date().toLocaleTimeString());
      handleIsSaving(false);
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

  //reset editor
  const resetEditor = () => {
    editor.update(() => {
      $convertFromMarkdownString("", TRANSFORMERS);
    });
  };

  return null;
}
