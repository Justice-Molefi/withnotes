import Conversation from "./Conversation";

export default interface Chat{
    id: string;
    summary: string;
    convos: Conversation[]
}
