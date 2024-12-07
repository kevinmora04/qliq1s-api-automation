import { Logger } from '../../../support/logger';
import { BaseService } from '../base/base.service';

class DeleteMessageService extends BaseService {
  execute(
    userAzureId: string,
    chatId: string,
    messageId: string,
    isDeletedForAll: boolean
  ): Cypress.Chainable<any> {
    Logger.info('Starting DeleteMessage operation');
    Logger.debug('DeleteMessage request parameters', {
      userAzureId,
      chatId,
      messageId,
      isDeletedForAll,
    });

    return this.request<any>('DELETE', '/Chat/DeleteMessage', {
      body: {
        userAzureId,
        chatId,
        messageId,
        isDeletedForAll,
      },
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      Logger.debug('DeleteMessage response received', { response });

      if (response.StatusCode === 200) {
        Logger.info('DeleteMessage operation completed successfully', {
          statusCode: response.StatusCode,
          message: response.Message,
        });
      } else {
        Logger.error('DeleteMessage operation failed', {
          statusCode: response.StatusCode,
          message: response.Message,
        });
      }

      return response;
    });
  }
}

export const deleteMessageService = new DeleteMessageService();
