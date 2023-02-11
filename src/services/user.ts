import { db } from '@/db';
import { compact } from '@/utils';
import { UserForumService } from './user-forum';

export class UserService {
  constructor(private readonly userModel: typeof db.users, private readonly userForumService: UserForumService) {}

  async getUserById(userId: string) {
    return this.userModel.find(({ id }) => id === userId);
  }

  async getForumUsers(forumId: string) {
    const userForums = await this.userForumService.getUserForumsByForumId(forumId);
    const filteredUserForums = compact(userForums.map(({ userId }) => this.userModel.find(({ id }) => userId === id)));

    return filteredUserForums;
  }
}
