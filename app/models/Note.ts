import { SerializedEditorState, SerializedLexicalNode } from "lexical";

export interface Note{
    id: string,
    content: SerializedEditorState<SerializedLexicalNode>
}