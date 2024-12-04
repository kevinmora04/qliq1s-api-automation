import { connectService } from './connections.service.connect';
import { getFriendsService } from './connections.service.getFriends';

export const connectionsService = {
  connect: connectService.execute.bind(connectService),
  getFriends: getFriendsService.execute.bind(getFriendsService),
};

export * from './connections.service.types';
