import { ChatResponse } from '../../interfaces/chat/chat-response';
import { BaseService } from '../base/base.service';

class GetChatsService extends BaseService {
  execute(userAzureId: string): Cypress.Chainable<ChatResponse> {
    return this.request<ChatResponse>('GET', '/Chat/GetChats', {
      qs: { userAzureId },
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const getChatsService = new GetChatsService();
