import { BaseService } from '../base/base.service';
import { ApiResponse, UpdateMessageParams } from './chat.service.types';

class UpdateMessageService extends BaseService {
  execute(params: UpdateMessageParams): Cypress.Chainable<ApiResponse> {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.config('baseUrl')}/Chat/UpdateMessage`,
      headers: { 'Content-Type': 'application/json' },
      body: params
    }).then(this.handleResponse('Failed to update message'));
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

export const updateMessageService = new UpdateMessageService();