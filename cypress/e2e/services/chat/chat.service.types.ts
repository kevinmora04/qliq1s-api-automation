export interface CreateChatParams {
    initiatorUserAzureId: string;
    initiatorUserName: string;
    participantsJson: string;
    topic: string;
    profilePicture: string | null;
    chatType: number;
  }
  
  export interface SendMessageParams {
    senderUserAzureId: string;
    senderUserName: string;
    chatId: string;
    content: string;
    sendPush?: boolean;
    attachments?: any[];
  }
  
  export interface UpdateMessageParams {
    userAzureId: string;
    chatId: string;
    messageId: string;
    newContent: string;
  }
  
  export interface DeleteChatParams {
    userAzureId: string;
    chatId: string;
  }
  
  export interface ApiResponse<T = any> {
    StatusCode: number;
    Message: string;
    Data: T;
  }

  export interface ChatThreadItem {
    Id: string;
    Topic: string;
    DeletedOn: string | null;
    LastMessageReceivedOn: string | null;
  }

  export interface Participant {
    AzureId: string;
    UserId: string;
    Name: string;
    IsAdmin: string;
    ProfilePicture: string;
  }

  export interface ChatData {
    ChatThreadItem: ChatThreadItem;
    LastMessageContent: string;
    LastMessageSender: string;
    NotReadCount: number;
    ChatType: string;
    Participants: Participant[];
    ProfilePictureUrl: string;
  }

  export interface ChatResponse {
    StatusCode: number;
    Message: string;
    Data: ChatData[];
  }