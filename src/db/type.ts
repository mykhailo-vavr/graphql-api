// eslint-disable-next-line import/no-cycle
import { Forum, Message, Request, User } from '@/__generated__/graphql';

export type DBType = {
  users: User[];
  forums: Forum[];
  userForums: {
    id: string;
    userId: string;
    forumId: string;
  }[];
  requests: Request[];
  messages: Message[];
};
