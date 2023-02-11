import { Forum, Message, Request, User } from '../__generated__/graphql';
import { uuid } from '../utils';

const forums: Omit<Forum, 'users' | 'admin' | 'messages'>[] = [
  {
    id: uuid(),
    name: 'forum_1',
    isPrivate: false,
    adminId: null,
  },
  {
    id: uuid(),
    name: 'forum_2',
    isPrivate: false,
    adminId: null,
  },
];

const users: Omit<User, 'forums'>[] = [
  {
    id: uuid(),
    name: 'user_1',
    pictureUrl: 'http://picture1.png',
  },
  {
    id: uuid(),
    name: 'user_2',
    pictureUrl: 'http://picture2.png',
  },
  {
    id: uuid(),
    name: 'user_3',
    pictureUrl: 'http://picture3.png',
  },
];

const userForums = [
  {
    id: uuid(),
    userId: users[0].id,
    forumId: forums[0].id,
  },
  {
    id: uuid(),
    userId: users[1].id,
    forumId: forums[1].id,
  },
];

const requests: Omit<Request, 'forum' | 'admin' | 'user'>[] = [
  { id: uuid(), adminId: users[0].id, forumId: forums[0].id, userId: users[1].id },
];

const messages: Omit<Message, 'forum' | 'user'>[] = [
  { id: uuid(), text: 'some text 1', userId: users[0].id, forumId: forums[0].id, createdAt: new Date() },
  {
    id: uuid(),
    text: 'some text 2',
    userId: users[0].id,
    forumId: forums[0].id,
    createdAt: new Date(Date.now() - 40000),
  },
  {
    id: uuid(),
    text: 'some text 3',
    userId: users[0].id,
    forumId: forums[0].id,
    createdAt: new Date(Date.now() - 10000),
  },
];

export const db = {
  users: users as User[],
  forums: forums as Forum[],
  userForums,
  requests: requests as Request[],
  messages: messages as Message[],
};
