import { Logger } from '../../../support/logger';
import { BaseService } from '../base/base.service';
import { ApiResponse, CreateChatParams } from './chat.service.types';

class CreateChatService extends BaseService {
  execute(params: CreateChatParams): Cypress.Chainable<ApiResponse> {
    Logger.info('Starting CreateChat operation');
    Logger.debug('CreateChat request parameters', {
      InitiatorUserAzureId: params.initiatorUserAzureId,
      InitiatorUserName: params.initiatorUserName,
      participantsJson: params.participantsJson,
      Topic: params.topic,
      ProfilePicture: params.profilePicture,
      ChatType: params.chatType,
    });

    return this.request<ApiResponse>('POST', '/Chat/CreateChat', {
      form: true,
      headers: { 'Content-Type': 'multipart/form-data' },
      body: {
        InitiatorUserAzureId: params.initiatorUserAzureId,
        InitiatorUserName: params.initiatorUserName,
        participantsJson: params.participantsJson,
        Topic: params.topic,
        ProfilePicture: params.profilePicture,
        ChatType: params.chatType,
      },
    }).then((response) => {
      Logger.debug('CreateChat response received', { response });

      if (response.StatusCode === 200) {
        Logger.info('CreateChat operation completed successfully', {
          statusCode: response.StatusCode,
          message: response.Message,
        });
      } else {
        Logger.error('CreateChat operation failed', {
          statusCode: response.StatusCode,
          message: response.Message,
        });
      }

      return response;
    });
  }
}

export const createChatService = new CreateChatService();
