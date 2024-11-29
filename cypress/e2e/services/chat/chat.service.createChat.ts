import { BaseService } from '../base/base.service';
import { ApiResponse, CreateChatParams } from './chat.service.types';

class CreateChatService extends BaseService {
  execute(params: CreateChatParams): Cypress.Chainable<ApiResponse> {
    return cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/Chat/CreateChat`,
      form: true,
      headers: { 'Content-Type': 'multipart/form-data' },
      body: {
        InitiatorUserAzureId: params.initiatorUserAzureId,
        InitiatorUserName: params.initiatorUserName,
        participantsJson: params.participantsJson,
        Topic: params.topic,
        ProfilePicture: params.profilePicture,
        ChatType: params.chatType
      }
    }).then(this.handleResponse('Failed to create chat'));
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

export const createChatService = new CreateChatService();