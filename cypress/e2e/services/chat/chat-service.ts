import { ChatResponse } from '../../interfaces/chat/chat-response';
import { CreateChatResponse } from '../../interfaces/chat/create-chat-response';
import { GetMessagesResponse } from '../../interfaces/chat/get-message-response';
import { BaseService } from '../base/base-service';

class ChatService extends BaseService {
  getChats(userAzureId: string): Cypress.Chainable<ChatResponse> {
    return this.request<ChatResponse>('GET', '/Chat/GetChats', {
      qs: { userAzureId },
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getMessages(userAzureId: string, chatId: string): Cypress.Chainable<GetMessagesResponse> {
    return this.request<GetMessagesResponse>('GET', '/Chat/GetMessages', {
      qs: { userAzureId, chatId },
      headers: { 'accept': '*/*' }
    });
  }

  getToken(userAzureId: string): Cypress.Chainable<any> {
    return this.request<any>('GET', '/Chat/GetToken', {
      qs: { userAzureId },
      headers: { 'accept': '*/*' }
    });
  }

  createChat(
    initiatorUserAzureId: string,
    initiatorUserName: string,
    participantsJson: string,
    topic: string,
    profilePicture: string | null,
    chatType: number
  ): Cypress.Chainable<CreateChatResponse> {
    return cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/Chat/CreateChat`,
      form: true, 
      headers: { 'Content-Type': 'multipart/form-data' },
      body: {
        InitiatorUserAzureId: initiatorUserAzureId,
        InitiatorUserName: initiatorUserName,
        participantsJson,
        Topic: topic,
        ProfilePicture: profilePicture,
        ChatType: chatType,
      }
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`Failed to create chat: ${response.status}`);
      }
      return response.body as CreateChatResponse;
    });
  }
}

export const chatService = new ChatService();