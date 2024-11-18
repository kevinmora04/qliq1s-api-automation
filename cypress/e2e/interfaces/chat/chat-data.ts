import { ChatThreadItem } from './chat-thread-item';
import { Participant } from './participant';

export interface ChatData {
  ChatThreadItem: ChatThreadItem;
  LastMessageContent: string;
  LastMessageSender: string;
  NotReadCount: number;
  ChatType: string;
  Participants: Participant[];
  ProfilePictureUrl: string;
}