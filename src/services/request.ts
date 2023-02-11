import { Request } from '@/__generated__/graphql';
import { db } from '@/db';
import { uuid } from '@/utils';
import { UserForumService } from './user-forum';

export class RequestService {
  constructor(private readonly requestModel: typeof db.requests, private readonly userForumService: UserForumService) {}

  async getRequestById(requestId: string) {
    return this.requestModel.find(({ id }) => id === requestId);
  }

  async getAdminRequests(adminId: string) {
    return this.requestModel.filter(({ userId }) => userId === adminId);
  }

  async createRequest(userId: string, adminId: string, forumId: string) {
    const request = {
      id: uuid(),
      adminId,
      userId,
      forumId,
    } as Request;

    this.requestModel.push(request);

    return request;
  }

  async deleteRequest(requestId: string) {
    this.requestModel.filter(({ id }) => id !== requestId);
  }

  async acceptRequest(userId: string, requestId: string) {
    const request = await this.getRequestById(requestId);

    if (!request || request.adminId !== userId) {
      throw new Error('Access denied. You are not admin for this request');
    }

    await this.userForumService.createUserForum(request.userId, request.forumId);
    await this.deleteRequest(requestId);

    return true;
  }

  async refuseRequest(userId: string, requestId: string) {
    const request = await this.getRequestById(requestId);

    if (!request || request.adminId !== userId) {
      throw new Error('Access denied. You are not admin for this request');
    }

    await this.deleteRequest(requestId);

    return true;
  }
}
