import { Logger } from '../../../support/logger';
import { BaseService } from '../base/base.service';

class AddParticipantService extends BaseService {
  execute(
    userAzureId: string,
    chatId: string,
    participantUserAzureId: string
  ): Cypress.Chainable<any> {
    Logger.info('Starting AddParticipant operation');
    Logger.debug('AddParticipant request parameters', {
      userAzureId,
      chatId,
      participantUserAzureId,
    });

    return this.request<any>('POST', '/Chat/AddParticipant', {
      body: {
        userAzureId,
        chatId,
        participantUserAzureId,
      },
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      Logger.debug('AddParticipant response received', { response });

      if (response.StatusCode === 200) {
        Logger.info('AddParticipant operation completed successfully', {
          statusCode: response.StatusCode,
          message: response.Message,
        });
      } else {
        Logger.error('AddParticipant operation failed', {
          statusCode: response.StatusCode,
          message: response.Message,
        });
      }

      return response;
    });
  }
}

export const addParticipantService = new AddParticipantService();
