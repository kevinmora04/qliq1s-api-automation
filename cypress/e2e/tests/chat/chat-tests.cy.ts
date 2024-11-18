import { ChatResponse } from '../../interfaces/chat/chat-response';
import { GetMessagesResponse } from '../../interfaces/chat/get-message-response';
import { chatService } from '../../services/chat/chat-service';

describe('Chat API Tests', () => {
  let userAzureId: string;
  let chatId: string;

  before(() => {
    cy.fixture('chatData').then((data) => {
      userAzureId = data.userAzureId;
      chatId = data.chatId;
    });
  });

  it('GET /Chat/GetChats - Should return chats for the given userAzureId', () => {
    chatService.getChats(userAzureId).then((response: ChatResponse) => {
      expect(response.StatusCode).to.eq(200);
      expect(response.Message).to.eq('Chats retrieved');
      expect(response.Data).to.be.an('array');
    });
  });

  it('GET /Chat/GetChats - Should return chats for the given userAzureId', () => {
    chatService.getChats('0').then((response: ChatResponse) => {
      expect(response.StatusCode).to.eq(200);
      expect(response.Message).to.eq('No chats found');
      expect(response.Data).to.be.an('null');
    });
  });

  it('GET /Chat/GetMessages - Should retrieve messages for the given userAzureId and chatId', () => {
    chatService.getMessages(userAzureId, chatId).then((response: GetMessagesResponse) => {
      expect(response.StatusCode).to.eq(200);
      expect(response.Message).to.eq('Messages retrieved');
      expect(response.Data).to.be.an('array');
      expect(response.Data.length).to.be.greaterThan(0);
    });
  });

  it('GET /Chat/GetToken - Should retrieve token for the given userAzureId', () => {
    chatService.getToken(userAzureId).then((response) => {
      expect(response.StatusCode).to.eq(200);
      expect(response.Message).to.eq('Token retrieved');
      expect(response.Data).to.have.property('Token');
    });
  });
});