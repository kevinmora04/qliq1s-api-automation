import { BaseService } from '../base/base.service';

class AddParticipantService extends BaseService {
  execute(userAzureId: string, chatId: string, participantUserAzureId: string): Cypress.Chainable<any> {
    return this.request<any>('POST', '/Chat/AddParticipant', {
      body: {
        userAzureId,
        chatId,
        participantUserAzureId,
      },
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const addParticipantService = new AddParticipantService();
