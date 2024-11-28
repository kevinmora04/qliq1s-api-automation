export interface UpdateMessageResponse {
    StatusCode: number;
    Message: string;
    Data: {
      MessageId: string;
      UpdatedOn: string;
    };
  }