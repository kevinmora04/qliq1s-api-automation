import { Logger } from '../../../support/logger';
import { BaseService } from '../base/base.service';
import { ApiResponse, DeleteChatParams } from './chat.service.types';

class DeleteChatService extends BaseService {
  execute(params: DeleteChatParams): Cypress.Chainable<ApiResponse> {
    Logger.info('Starting DeleteChatThread operation');
    Logger.debug('DeleteChatThread request parameters', params);

    return this.request<ApiResponse>('DELETE', '/Chat/DeleteChatThread', {
      headers: { 'Content-Type': 'application/json' },
      body: params,
    }).then((response) => {
      Logger.debug('DeleteChatThread response received', { response });

      if (response.StatusCode === 200) {
        Logger.info('DeleteChatThread operation completed successfully', {
          statusCode: response.StatusCode,
          message: response.Message,
        });
      } else {
        Logger.error('DeleteChatThread operation failed', {
          statusCode: response.StatusCode,
          message: response.Message,
        });
      }

      return response;
    });
  }
}

export const deleteChatService = new DeleteChatService();
