import { BaseService } from '../base/base.service';

class DeleteMessageService extends BaseService {
  execute(userAzureId: string, chatId: string, messageId: string, isDeletedForAll: boolean): Cypress.Chainable<any> {
    return this.request<any>('DELETE', '/Chat/DeleteMessage', {
      body: {
        userAzureId,
        chatId,
        messageId,
        isDeletedForAll
      },
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const deleteMessageService = new DeleteMessageService();
