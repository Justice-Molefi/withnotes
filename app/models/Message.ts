import { Role } from "./Role";

export default interface Message {
  role: Role;
  content: string;
}
