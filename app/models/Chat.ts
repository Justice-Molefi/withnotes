import Message from "./Message";

export default interface Chat{
    id: string;
    summary: string;
    messages: Message[],
    notes: string
}
