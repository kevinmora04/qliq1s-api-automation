import { BaseService } from '../base/base.service';
import { ApiResponse, DeleteChatParams } from './chat.service.types';

class DeleteChatService extends BaseService {
  execute(params: DeleteChatParams): Cypress.Chainable<ApiResponse> {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.config('baseUrl')}/Chat/DeleteChatThread`,
      headers: { 'Content-Type': 'application/json' },
      body: params
    }).then(this.handleResponse('Failed to delete chat thread'));
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

export const deleteChatService = new DeleteChatService();