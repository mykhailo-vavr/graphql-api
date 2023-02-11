import { db } from '@/db';
import { UserService } from './user';
import { ForumService } from './forum';
import { RequestService } from './request';
import { UserForumService } from './user-forum';
import { MessageService } from './message';

export const getForumServiceInstance = (models: typeof db) => {
  const userForumService = new UserForumService(models.userForums);
  const userService = new UserService(models.users, userForumService);
  const requestService = new RequestService(models.requests, userForumService);
  const forumService = new ForumService(models.forums, userService, userForumService, requestService);

  return forumService;
};

export const getUserServiceInstance = (models: typeof db) => {
  const userForumService = new UserForumService(models.userForums);
  const userService = new UserService(models.users, userForumService);

  return userService;
};

export const getMessageServiceInstance = (models: typeof db) => {
  const messageService = new MessageService(models.messages);

  return messageService;
};

export const getRequestServiceInstance = (models: typeof db) => {
  const userForumService = new UserForumService(models.userForums);
  const requestService = new RequestService(models.requests, userForumService);

  return requestService;
};

export { UserService, ForumService, RequestService, MessageService };
