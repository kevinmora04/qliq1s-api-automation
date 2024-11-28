export interface SendMessageResponse {
    StatusCode: number;
    Message: string;
    Data: {
      MessageId: string;
      SentOn: string;
    };
  }