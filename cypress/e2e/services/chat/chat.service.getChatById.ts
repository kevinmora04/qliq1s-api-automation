import { BaseService } from '../base/base.service';
import { ApiResponse } from './chat.service.types';

class GetChatByIdService extends BaseService {
  /**
   * Retrieves detailed info about a specific chat thread by ID.
   * @param userAzureId - The user performing the request (must be part of the chat).
   * @param threadId - The unique identifier of the chat thread.
   */
  execute(userAzureId: string, threadId: string): Cypress.Chainable<ApiResponse> {
    return this.request<ApiResponse>('GET', '/Chat/GetChatById', {
      qs: { userAzureId, threadId },
      headers: { accept: '*/*' }
    });
  }
}

export const getChatByIdService = new GetChatByIdService();