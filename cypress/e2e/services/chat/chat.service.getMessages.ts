import { BaseService } from '../base/base.service';
import { ApiResponse } from './chat.service.types';

class GetMessagesService extends BaseService {
  execute(userAzureId: string, chatId: string): Cypress.Chainable<ApiResponse> {
    return this.request<ApiResponse>('GET', '/Chat/GetMessages', {
      qs: { userAzureId, chatId },
      headers: { accept: '*/*' }
    });
  }
}

export const getMessagesService = new GetMessagesService();