import { addParticipantService } from './chat.service.addParticipant';
import { createChatService } from './chat.service.createChat';
import { deleteChatService } from './chat.service.deleteChat';
import { deleteMessageService } from './chat.service.deleteMessage';
import { getChatsService } from './chat.service.getChats';
import { getMessagesService } from './chat.service.getMessages';
import { getTokenService } from './chat.service.getToken';
import { removeParticipantService } from './chat.service.removeParticipant';
import { sendMessageService } from './chat.service.sendMessage';
import { updateMessageService } from './chat.service.updateMessage';
import { getChatByIdService } from './chat.service.getChatById';

export const chatService = {
  sendMessage: sendMessageService.execute.bind(sendMessageService),
  createChat: createChatService.execute.bind(createChatService),
  getMessages: getMessagesService.execute.bind(getMessagesService),
  updateMessage: updateMessageService.execute.bind(updateMessageService),
  deleteMessage: deleteMessageService.execute.bind(deleteMessageService),
  deleteChat: deleteChatService.execute.bind(deleteChatService),
  getToken: getTokenService.execute.bind(getTokenService),
  getChats: getChatsService.execute.bind(getChatsService),
  addParticipant: addParticipantService.execute.bind(addParticipantService),
  removeParticipant: removeParticipantService.execute.bind(removeParticipantService),
  getChatById: getChatByIdService.execute.bind(getChatByIdService),
};

export * from './chat.service.types';
