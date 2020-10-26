import User from "./User";

export default interface Message {
  id: string;
  user: User | undefined;
  message: string;
  date: number;
}