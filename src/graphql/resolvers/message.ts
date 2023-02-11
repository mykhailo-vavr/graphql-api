import { Resolvers } from '@/__generated__/graphql';
import { getForumServiceInstance, getMessageServiceInstance, getUserServiceInstance } from '@/services';
import { authenticate } from '@/utils';

export const messageResolvers: Resolvers = {
  Mutation: {
    async createMessage(_, { input }, ctx) {
      const { userId } = authenticate(ctx);
      const messageService = getMessageServiceInstance(ctx.dataSource.db);

      const result = messageService.createMessage(userId, input);
      return result;
    },
  },

  Message: {
    async user({ userId }, _, ctx) {
      authenticate(ctx);
      const userService = getUserServiceInstance(ctx.dataSource.db);

      const result = await userService.getUserById(userId);

      if (!result) {
        throw new Error('There is no user for message');
      }

      return result;
    },

    async forum({ forumId }, _, ctx) {
      authenticate(ctx);
      const forumService = getForumServiceInstance(ctx.dataSource.db);

      const result = await forumService.getForumById(forumId);

      if (!result) {
        throw new Error('There is no forum for message');
      }

      return result;
    },
  },
};
