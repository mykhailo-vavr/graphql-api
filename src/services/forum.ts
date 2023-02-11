import { db } from '@/db';
import { compact, uuid } from '@/utils';
import { CreateForumInput, Forum } from '@/__generated__/graphql';
import { UserService } from './user';
import { UserForumService } from './user-forum';
import { RequestService } from './request';

export class ForumService {
  constructor(
    private readonly forumModel: typeof db.forums,
    private readonly userService: UserService,
    private readonly userForumService: UserForumService,
    private readonly requestService: RequestService,
  ) {}

  async getForumById(forumId: string) {
    return this.forumModel.find(({ id }) => id === forumId);
  }

  async getForumByName(forumName: string) {
    return this.forumModel.find(({ name }) => name === forumName);
  }

  async getPublicForums() {
    return this.forumModel.filter(({ isPrivate }) => !isPrivate);
  }

  async getUserForums(userId: string) {
    const userForums = await this.userForumService.getUserForumsByUserId(userId);
    const filteredUserForums = compact(
      userForums.map(({ forumId }) => this.forumModel.find(({ id }) => forumId === id)),
    );

    return filteredUserForums;
  }

  async getForumAdmin(forumId: string) {
    const forum = await this.getForumById(forumId);

    if (!forum || !forum.isPrivate || !forum.adminId) {
      return null;
    }

    const admin = await this.userService.getUserById(forum.adminId);

    return admin || null;
  }

  async joinForum(userId: string, forumId: string) {
    const forum = await this.getForumById(forumId);

    if (!forum) {
      throw new Error('There is no such forum');
    }

    const userForum = db.userForums.find((uf) => uf.userId === userId);

    if (userForum) {
      throw new Error('You have already joined to this forum');
    }

    if (forum.isPrivate) {
      const admin = await this.getForumAdmin(forumId);

      if (!admin) {
        throw new Error('There is no admin for private forum');
      }

      await this.requestService.createRequest(userId, admin.id, forumId);
    } else {
      await this.userForumService.createUserForum(userId, forumId);
    }

    return true;
  }

  async createForum(userId: string, input: CreateForumInput) {
    const forum = await this.getForumByName(input.name);

    if (forum) {
      throw new Error('There is already existed forum with such name');
    }

    const forumId = uuid();

    const newForum = {
      id: forumId,
      name: input.name,
      isPrivate: !!input.isPrivate,
      adminId: input.isPrivate ? userId : null,
    } as Forum;

    this.forumModel.push(newForum);

    await this.userForumService.createUserForum(userId, forumId);

    return newForum;
  }
}
