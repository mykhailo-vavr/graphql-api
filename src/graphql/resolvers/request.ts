import { Resolvers } from '@/__generated__/graphql';
import { getForumServiceInstance, getRequestServiceInstance, getUserServiceInstance } from '@/services';
import { authenticate } from '@/utils';

export const requestResolvers: Resolvers = {
  Query: {
    async userRequests(_, __, ctx) {
      const { userId } = authenticate(ctx);
      const requestService = getRequestServiceInstance(ctx.dataSource.db);

      const result = await requestService.getAdminRequests(userId);
      return result;
    },
  },

  Mutation: {
    async acceptRequest(_, { requestId }, ctx) {
      const { userId } = authenticate(ctx);
      const requestService = getRequestServiceInstance(ctx.dataSource.db);

      const result = await requestService.acceptRequest(userId, requestId);
      return result;
    },

    async refuseRequest(_, { requestId }, ctx) {
      const { userId } = authenticate(ctx);
      const requestService = getRequestServiceInstance(ctx.dataSource.db);

      const result = await requestService.refuseRequest(userId, requestId);
      return result;
    },
  },

  Request: {
    async admin({ adminId }, _, ctx) {
      authenticate(ctx);
      const userService = getUserServiceInstance(ctx.dataSource.db);

      const result = await userService.getUserById(adminId);

      if (!result) {
        throw new Error('There is no admin for request');
      }

      return result;
    },

    async forum({ forumId }, _, ctx) {
      authenticate(ctx);
      const forumService = getForumServiceInstance(ctx.dataSource.db);

      const result = await forumService.getForumById(forumId);

      if (!result) {
        throw new Error('There is no forum for request');
      }

      return result;
    },

    async user({ userId }, _, ctx) {
      authenticate(ctx);
      const userService = getUserServiceInstance(ctx.dataSource.db);

      const result = await userService.getUserById(userId);

      if (!result) {
        throw new Error('There is no user for request');
      }

      return result;
    },
  },
};
