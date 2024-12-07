import { BaseService } from '../base/base.service';
import { ChatResponse } from './chat.service.types';

class GetChatsService extends BaseService {
  execute(userAzureId: string): Cypress.Chainable<ChatResponse> {
    return this.request<ChatResponse>('GET', '/Chat/GetChats', {
      qs: { userAzureId },
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const getChatsService = new GetChatsService();
