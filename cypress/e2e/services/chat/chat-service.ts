import { ChatResponse } from '../../interfaces/chat/chat-response';
import { CreateChatResponse } from '../../interfaces/chat/create-chat-response';
import { GetMessagesResponse } from '../../interfaces/chat/get-message-response';
import { BaseService } from '../base/base-service';

class ChatService extends BaseService {
  getChats(userAzureId: string): Cypress.Chainable<ChatResponse> {
    return this.request<ChatResponse>('GET', '/Chat/GetChats', {
      qs: { userAzureId },
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getMessages(userAzureId: string, chatId: string): Cypress.Chainable<GetMessagesResponse> {
    return this.request<GetMessagesResponse>('GET', '/Chat/GetMessages', {
      qs: { userAzureId, chatId },
      headers: { accept: '*/*' },
    });
  }

  getToken(userAzureId: string): Cypress.Chainable<any> {
    return this.request<any>('GET', '/Chat/GetToken', {
      qs: { userAzureId },
      headers: { accept: '*/*' },
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
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`Failed to create chat: ${response.status}`);
      }
      return response.body as CreateChatResponse;
    });
  }

  sendMessage(
    senderUserAzureId: string,
    senderUserName: string,
    chatId: string,
    content: string,
    sendPush: boolean = false,
    attachments: any[] = []
  ): Cypress.Chainable<any> {
    const formData = new FormData();
    formData.append('ChatId', chatId);
    formData.append('SenderUserAzureId', senderUserAzureId);
    formData.append('SenderUserName', senderUserName);
    formData.append('Content', content);
    formData.append('SendPush', sendPush.toString());
    
    if (attachments.length > 0) {
      attachments.forEach((attachment, index) => {
        formData.append(`attachments[${index}]`, attachment);
      });
    }

    return cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/Chat/SendMessage`,
      form: true,
      body: {
        ChatId: chatId,
        SenderUserAzureId: senderUserAzureId,
        SenderUserName: senderUserName,
        Content: content,
        SendPush: sendPush,
        attachments: attachments
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`Failed to send message: ${response.status}`);
      }
      return response.body;
    });
  }

  updateMessage(
    userAzureId: string,
    chatId: string,
    messageId: string,
    newContent: string
  ): Cypress.Chainable<any> {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.config('baseUrl')}/Chat/UpdateMessage`,
      headers: { 'Content-Type': 'application/json' },
      body: {
        userAzureId,
        chatId,
        messageId,
        newContent
      }
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`Failed to update message: ${response.status}`);
      }
      return response.body;
    });
  }

  deleteChatThread(userAzureId: string, chatId: string): Cypress.Chainable<any> {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.config('baseUrl')}/Chat/DeleteChatThread`,
      headers: { 'Content-Type': 'application/json' },
      body: {
        userAzureId,
        chatId,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`Failed to delete chat thread: ${response.status}`);
      }
      return response.body;
    });
  }
}

export const chatService = new ChatService();