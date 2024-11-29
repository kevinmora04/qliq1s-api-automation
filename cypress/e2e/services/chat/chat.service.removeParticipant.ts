import { BaseService } from '../base/base.service';

class RemoveParticipantService extends BaseService {
  execute(userAzureId: string, chatId: string, participantUserAzureId: string): Cypress.Chainable<any> {
    return this.request<any>('POST', '/Chat/RemoveParticipant', {
      body: {
        userAzureId,
        chatId,
        participantUserAzureId,
      },
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const removeParticipantService = new RemoveParticipantService();
