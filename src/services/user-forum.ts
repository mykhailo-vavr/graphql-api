import { db } from '@/db';
import { uuid } from '@/utils';

export class UserForumService {
  constructor(private readonly userForumModel: typeof db.userForums) {}

  async getUserForumsByUserId(userId: string) {
    return this.userForumModel.filter((userForum) => userForum.userId === userId);
  }

  async getUserForumsByForumId(forumId: string) {
    return this.userForumModel.filter((userForum) => userForum.forumId === forumId);
  }

  async createUserForum(userId: string, forumId: string) {
    const userForum = {
      id: uuid(),
      userId,
      forumId,
    };

    this.userForumModel.push(userForum);

    return userForum;
  }
}
