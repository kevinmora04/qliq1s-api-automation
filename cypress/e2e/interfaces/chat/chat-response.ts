import { ChatData } from './chat-data';

export interface ChatResponse {
  StatusCode: number;
  Message: string;
  Data: ChatData[];
}