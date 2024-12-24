import { chatService, CreateChatParams, DeleteChatParams, SendMessageParams, UpdateMessageParams } from '../../services/chat';

describe('Chat API Integration Tests', () => {
  let userAzureId: string;
  let initiatorUserAzureId: string;
  let initiatorUserName: string;
  let participantsJson: string;
  let newParticipantId: string;
  let topic: string;
  let profilePicture: string;
  let chatType: number;

  before(() => {
    cy.log('🔧 Loading test configuration from fixture');
    cy.fixture('chat/chat').then((data) => {
      userAzureId = data.userAzureId;
      topic = data.topic;
      profilePicture = data.profilePicture;
      chatType = data.chatType;

      initiatorUserAzureId = data.initiator.azureId;
      initiatorUserName = data.initiator.name;

      participantsJson = JSON.stringify(data.participants);
      newParticipantId = data.newParticipant.id;

    });
  });

  describe('End-to-End Chat Flow', () => {
    describe('Authentication', () => {
      it('GET /api/Chat/GetToken - Should obtain authentication token for chat operations', () => {
        cy.log('🔄 Starting token retrieval process');

        cy.wrap(null).then(() => {
          return chatService.getToken(userAzureId).then((response) => {
            cy.log(`📨 Token Response: ${JSON.stringify(response, null, 2)}`);
            expect(response.StatusCode, 'Response status code should be 200').to.eq(200);
            expect(response.Message, 'Response message should indicate token retrieved').to.eq('Token retrieved');
            expect(response.Data, 'Response should contain token data').to.have.property('Token');
            cy.log(`✅ Token retrieved successfully for user: ${userAzureId}`);
          });
        });
      });
    });

    describe('Chat Thread Management', () => {
      it('POST /api/Chat/CreateChat - Should initialize a new chat thread with participants', () => {
        cy.log('🔄 Starting chat creation process');
        cy.log(`📝 Creating chat with topic: "${topic}"`);

        const createChatParams: CreateChatParams = {
          initiatorUserAzureId,
          initiatorUserName,
          participantsJson,
          topic,
          profilePicture,
          chatType
        };

        cy.wrap(null).then(() => {
          return chatService.createChat(createChatParams)
            .then((response) => {
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

      it('GET /api/Chat/GetChats - Should retrieve all available chat threads', () => {
        cy.log('🔄 Starting chat retrieval process');
        cy.log(`📝 Fetching chats for userAzureId: ${userAzureId}`);

        cy.wrap(null).then(() => {
          return chatService.getChats(userAzureId)
            .then((response) => {
              cy.log(`📨 Get Chats Response: ${JSON.stringify(response, null, 2)}`);
              expect(response.StatusCode, 'Get chats response status should be 200').to.eq(200);
              expect(response.Data, 'Response should contain chats array').to.be.an('array');
              cy.log(`✅ Successfully retrieved ${response.Data.length} chats`);
            });
        });
      });
    });

    describe('Message Operations', () => {
      it('POST /api/Chat/SendMessage - Should send a new message to the chat thread', () => {
        const chatId = Cypress.env('currentChatId');
        const testMessage = 'Hello, this is a test message from automation!';

        if (!chatId) {
          throw new Error('❌ Chat ID not found in environment variables');
        }

        cy.log('🔄 Starting message sending process');
        cy.log(`📝 Preparing to send message to chat ${chatId}`);

        const sendMessageParams: SendMessageParams = {
          senderUserAzureId: initiatorUserAzureId,
          senderUserName: initiatorUserName,
          chatId,
          content: testMessage,
          sendPush: false,
          attachments: []
        };

        cy.wrap(null).then(() => {
          return chatService.sendMessage(sendMessageParams)
            .then((response) => {
              cy.log(`📨 Send Message Response: ${JSON.stringify(response, null, 2)}`);
              expect(response.StatusCode, 'Send message response status should be 200').to.eq(200);
              expect(response.Message, 'Response should confirm message sent').to.eq('Message sent');
              cy.log('✅ Message sent successfully');

              Cypress.env('currentMessageId', response.Data.MessageId);
            });
        });
      });

      it('PUT /api/Chat/UpdateMessage - Should modify an existing message in the chat thread', () => {
        const chatId = Cypress.env('currentChatId');
        const messageId = Cypress.env('currentMessageId');
        const updatedMessage = 'This message has been updated via automation!';

        if (!chatId || !messageId) {
          throw new Error('❌ Chat ID or Message ID not found in environment variables');
        }

        cy.log('🔄 Starting message update process');
        cy.log(`📝 Updating message in chat ${chatId}`);

        const updateMessageParams: UpdateMessageParams = {
          userAzureId,
          chatId,
          messageId,
          newContent: updatedMessage
        };

        cy.wrap(null).then(() => {
          return chatService.updateMessage(updateMessageParams)
            .then((response) => {
              cy.log(`📨 Update Message Response: ${JSON.stringify(response, null, 2)}`);
              expect(response.StatusCode, 'Update message response status should be 200').to.eq(200);
              cy.log('✅ Message updated successfully');
            });
        });
      });

      it('GET /api/Chat/GetMessages - Should retrieve all messages from the chat thread', () => {
        const chatId = Cypress.env('currentChatId');

        if (!chatId) {
          throw new Error('❌ Chat ID not found in environment variables');
        }

        cy.log('🔄 Starting message retrieval process');
        cy.log(`📝 Getting messages for chat ${chatId}`);

        cy.wrap(null).then(() => {
          return chatService.getMessages(userAzureId, chatId)
            .then((response) => {
              cy.log(`📨 Get Messages Response: ${JSON.stringify(response, null, 2)}`);
              expect(response.StatusCode, 'Get messages response status should be 200').to.eq(200);
              expect(response.Data, 'Response should contain messages array').to.be.an('array');
              cy.log(`✅ Successfully retrieved ${response.Data.length} messages`);
            });
        });
      });

      it('DELETE /api/Chat/DeleteMessage - Should remove specific message from the chat thread', () => {
        const chatId = Cypress.env('currentChatId');
        const messageId = Cypress.env('currentMessageId');

        if (!chatId || !messageId) {
          throw new Error('❌ Chat ID or Message ID not found in environment variables');
        }

        cy.log('🔄 Starting message deletion process');
        cy.log(`🗑️ Deleting message: ${messageId} from chat: ${chatId}`);

        cy.wrap(null).then(() => {
          return chatService.deleteMessage(userAzureId, chatId, messageId, true)
            .then((response) => {
              cy.log(`📨 Delete Message Response: ${JSON.stringify(response, null, 2)}`);
              expect(response.StatusCode, 'Delete message response status should be 200').to.eq(200);
              expect(response.Message, 'Response should confirm message deleted').to.eq('Message deleted successfully');
              cy.log('✅ Message deleted successfully');
            });
        });
      });
    });

    describe('Participant Management', () => {
      it('POST /api/Chat/AddParticipant - Should add new participant to the chat thread', () => {
        const chatId = Cypress.env('currentChatId');
    
        if (!chatId) {
          throw new Error('❌ Chat ID not found in environment variables');
        }
    
        cy.log('🔄 Starting process to add participant');
        cy.log(`📝 Adding participant with ID: ${newParticipantId} to chat: ${chatId}`);
    
        cy.wrap(null).then(() => {
          return chatService.addParticipant(userAzureId, chatId, newParticipantId)
            .then((response) => {
              cy.log(`📨 Add Participant Response: ${JSON.stringify(response, null, 2)}`);
              expect(response.StatusCode, 'Add participant response status should be 200').to.eq(200);
              expect(response.Message, 'Response should confirm participant added').to.eq('Participant added successfully');
              cy.log('✅ Participant added to chat successfully');
    
              Cypress.env('participantToRemoveId', newParticipantId);
            });
        });
      });

      it('POST /api/Chat/RemoveParticipant - Should remove participant from the chat thread', () => {
        const chatId = Cypress.env('currentChatId');
        const participantToRemoveId = Cypress.env('participantToRemoveId');
    
        if (!chatId || !participantToRemoveId) {
          throw new Error('❌ Chat ID or Participant ID not found in environment variables');
        }
    
        cy.log('🔄 Starting process to remove participant');
        cy.log(`📝 Removing participant with ID: ${participantToRemoveId} from chat: ${chatId}`);
    
        cy.wrap(null).then(() => {
          return chatService.removeParticipant(userAzureId, chatId, participantToRemoveId)
            .then((response) => {
              cy.log(`📨 Remove Participant Response: ${JSON.stringify(response, null, 2)}`);
              expect(response.StatusCode, 'Remove participant response status should be 200').to.eq(200);
              expect(response.Message, 'Response should confirm participant removed').to.eq('Participant removed successfully');
              cy.log('✅ Participant removed from chat successfully');
            });
        });
      });
    });

    describe('Chat Thread Cleanup', () => {
      it('DELETE /api/Chat/DeleteChatThread - Should remove the entire chat thread', () => {
        const chatId = Cypress.env('currentChatId');

        if (!chatId) {
          throw new Error('❌ Chat ID not found in environment variables');
        }

        cy.log('🔄 Starting chat deletion process');
        cy.log(`🗑️ Deleting chat: ${chatId}`);

        const deleteChatParams: DeleteChatParams = {
          userAzureId,
          chatId
        };

        cy.wrap(null).then(() => {
          return chatService.deleteChat(deleteChatParams)
            .then((response) => {
              cy.log(`📨 Delete Chat Response: ${JSON.stringify(response, null, 2)}`);
              expect(response.StatusCode, 'Delete chat response status should be 200').to.eq(200);
              expect(response.Message, 'Response should confirm deletion').to.eq('Chat thread deleted successfully');
              cy.log('✅ Chat deleted successfully');
            });
        });
      });
    });
  });

  afterEach(function() {
    cy.log(`📌 Test "${this.currentTest.title}" completed with status: ${this.currentTest.state}`);
  });
});