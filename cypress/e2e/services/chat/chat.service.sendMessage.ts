import { BaseService } from '../base/base.service';
import { ApiResponse, SendMessageParams } from './chat.service.types';

class SendMessageService extends BaseService {
  execute(params: SendMessageParams): Cypress.Chainable<ApiResponse> {
    return cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/Chat/SendMessage`,
      form: true,
      headers: { 'Content-Type': 'multipart/form-data' },
      body: {
        ChatId: params.chatId,
        SenderUserAzureId: params.senderUserAzureId,
        SenderUserName: params.senderUserName,
        Content: params.content,
        SendPush: params.sendPush ?? false,
        attachments: params.attachments ?? []
      }
    }).then(this.handleResponse('Failed to send message'));
  }

  private handleResponse(errorMessage: string) {
    return (response: any) => {
      if (response.status !== 200) {
        throw new Error(`${errorMessage}: ${response.status}`);
      }
      return response.body;
    };
  }
}

export const sendMessageService = new SendMessageService();