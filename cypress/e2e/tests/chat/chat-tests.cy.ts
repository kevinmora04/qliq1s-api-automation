import { CreateChatResponse } from '../../interfaces/chat/create-chat-response';
import { chatService } from '../../services/chat/chat-service';

describe('Chat API Tests', () => {
  // Test configuration variables
  let userAzureId: string;
  let initiatorUserAzureId: string;
  let initiatorUserName: string;
  let participantsJson: string;
  let topic: string;
  let profilePicture: string;
  let chatType: number;

  before(() => {
    cy.log('🔧 Loading test configuration from fixture');
    cy.fixture('chatData').then((data) => {
      userAzureId = data.userAzureId;
      initiatorUserAzureId = data.initiatorUserAzureId;
      initiatorUserName = data.initiatorUserName;
      participantsJson = data.participantsJson;
      topic = data.topic;
      profilePicture = data.profilePicture;
      chatType = data.chatType;
      cy.log('✅ Test configuration loaded successfully');
    });
  });

  describe('Chat Lifecycle Tests', () => {
    it('Step 1: Should retrieve token successfully', () => {
      cy.log('🔄 Starting token retrieval process');
      
      cy.wrap(null).then(() => {
        return chatService.getToken(userAzureId).then((response: any) => {
          cy.log(`📨 Token Response: ${JSON.stringify(response, null, 2)}`);
          expect(response.StatusCode, 'Response status code should be 200').to.eq(200);
          expect(response.Message, 'Response message should indicate token retrieved').to.eq('Token retrieved');
          expect(response.Data, 'Response should contain token data').to.have.property('Token');
          cy.log(`✅ Token retrieved successfully for user: ${userAzureId}`);
        });
      });
    });

    it('Step 2: Should create chat successfully', () => {
      cy.log('🔄 Starting chat creation process');
      cy.log(`📝 Creating chat with topic: "${topic}"`);
      
      cy.wrap(null).then(() => {
        return chatService
          .createChat(
            initiatorUserAzureId,
            initiatorUserName,
            participantsJson,
            topic,
            profilePicture,
            chatType
          )
          .then((response: CreateChatResponse) => {
            cy.log(`📨 Create Chat Response: ${JSON.stringify(response, null, 2)}`);
            expect(response.StatusCode, 'Create chat response status should be 200').to.eq(200);
            
            let chatId: string;
            if (response.Message === 'Chat created') {
              expect(response.Data, 'New chat should have ChatId').to.have.property('ChatId');
              chatId = response.Data.ChatId;
              cy.log('✅ New chat created successfully');
            } else if (response.Message === 'Chat already exist') {
              chatId = response.Data?.ChatId;
              cy.log('ℹ️ Using existing chat');
            } else {
              throw new Error(`❌ Unexpected response message: ${response.Message}`);
            }
            
            cy.log(`📋 Chat ID: ${chatId}`);
            Cypress.env('currentChatId', chatId);
          });
      });
    });

    it('Step 3: Should send message successfully', () => {
      const chatId = Cypress.env('currentChatId');
      const testMessage = 'Hello, this is a test message from automation!';

      if (!chatId) {
        throw new Error('❌ Chat ID not found in environment variables');
      }

      cy.log('🔄 Starting message sending process');
      cy.log(`📝 Preparing to send message to chat ${chatId}`);

      cy.wrap(null).then(() => {
        return chatService
          .sendMessage(
            initiatorUserAzureId,
            initiatorUserName,
            chatId,
            testMessage,
            false,
            []
          )
          .then((response: any) => {
            cy.log(`📨 Send Message Response: ${JSON.stringify(response, null, 2)}`);
            expect(response.StatusCode, 'Send message response status should be 200').to.eq(200);
            expect(response.Message, 'Response should confirm message sent').to.eq('Message sent');
            cy.log('✅ Message sent successfully');
            
            // Store messageId for update test
            Cypress.env('currentMessageId', response.Data.MessageId);
          });
      });
    });

    it('Step 4: Should update message successfully', () => {
      const chatId = Cypress.env('currentChatId');
      const messageId = Cypress.env('currentMessageId');
      const updatedMessage = 'This message has been updated via automation!';

      if (!chatId || !messageId) {
        throw new Error('❌ Chat ID or Message ID not found in environment variables');
      }

      cy.log('🔄 Starting message update process');
      cy.log(`📝 Updating message in chat ${chatId}`);

      cy.wrap(null).then(() => {
        return chatService
          .updateMessage(
            userAzureId,
            chatId,
            messageId,
            updatedMessage
          )
          .then((response: any) => {
            cy.log(`📨 Update Message Response: ${JSON.stringify(response, null, 2)}`);
            expect(response.StatusCode, 'Update message response status should be 200').to.eq(200);
            cy.log('✅ Message updated successfully');
          });
      });
    });


    it('Step 5: Should get messages successfully', () => {
      const chatId = Cypress.env('currentChatId');

      if (!chatId) {
        throw new Error('❌ Chat ID not found in environment variables');
      }

      cy.log('🔄 Starting message retrieval process');
      cy.log(`📝 Getting messages for chat ${chatId}`);

      cy.wrap(null).then(() => {
        return chatService.getMessages(userAzureId, chatId)
          .then((response: any) => {
            cy.log(`📨 Get Messages Response: ${JSON.stringify(response, null, 2)}`);
            expect(response.StatusCode, 'Get messages response status should be 200').to.eq(200);
            expect(response.Data, 'Response should contain messages array').to.be.an('array');
            cy.log(`✅ Successfully retrieved ${response.Data.length} messages`);
          });
      });
    });

    it('Step 6: Should delete chat successfully', () => {
      const chatId = Cypress.env('currentChatId');

      if (!chatId) {
        throw new Error('❌ Chat ID not found in environment variables');
      }

      cy.log('🔄 Starting chat deletion process');
      cy.log(`🗑️ Deleting chat: ${chatId}`);

      cy.wrap(null).then(() => {
        return chatService
          .deleteChatThread(userAzureId, chatId)
          .then((response: any) => {
            cy.log(`📨 Delete Chat Response: ${JSON.stringify(response, null, 2)}`);
            expect(response.StatusCode, 'Delete chat response status should be 200').to.eq(200);
            expect(response.Message, 'Response should confirm deletion').to.eq('Chat thread deleted successfully');
            cy.log('✅ Chat deleted successfully');
          });
      });
    });

  afterEach(function() {
    cy.log(`📌 Test "${this.currentTest.title}" completed with status: ${this.currentTest.state}`);
  });
});
});