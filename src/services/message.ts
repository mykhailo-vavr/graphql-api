import { db } from '@/db';
import { uuid } from '@/utils';
import { CreateMessageInput, Message } from '@/__generated__/graphql';

export class MessageService {
  constructor(private readonly messageModel: typeof db.messages) {}

  async getMessagesByForumId(forumId: string) {
    return this.messageModel.filter((message) => message.forumId === forumId);
  }

  async createMessage(userId: string, input: CreateMessageInput) {
    const message = {
      id: uuid(),
      text: input.text,
      createdAt: new Date(),
      userId,
      forumId: input.forumId,
    } as Message;

    this.messageModel.push(message);

    return message;
  }
}
