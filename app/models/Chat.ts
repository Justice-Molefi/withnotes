import Message from "./Message";
import Conversation from "./Message";

export default interface Chat{
    id: string;
    summary: string;
    messages: Message[]
}
