import { Resolvers } from '@/__generated__/graphql';
import { getForumServiceInstance, getMessageServiceInstance, getUserServiceInstance } from '@/services';
import { orderBy } from '@/utils';
import { authenticate } from '@/utils/auth';

export const forumResolvers: Resolvers = {
  Query: {
    async publicForums(_, __, ctx) {
      const forumService = getForumServiceInstance(ctx.dataSource.db);

      const result = await forumService.getPublicForums();
      return result;
    },
  },

  Mutation: {
    async joinForum(_, { forumId }, ctx) {
      const { userId } = authenticate(ctx);
      const forumService = getForumServiceInstance(ctx.dataSource.db);

      const result = await forumService.joinForum(userId, forumId);
      return result;
    },

    async createForum(_, { input }, ctx) {
      const { userId } = authenticate(ctx);
      const forumService = getForumServiceInstance(ctx.dataSource.db);

      const result = await forumService.createForum(userId, input);
      return result;
    },
  },

  Forum: {
    async admin({ id }, _, ctx) {
      authenticate(ctx);
      const forumService = getForumServiceInstance(ctx.dataSource.db);

      const result = await forumService.getForumAdmin(id);
      return result;
    },

    async users({ id }, _, ctx) {
      authenticate(ctx);
      const userService = getUserServiceInstance(ctx.dataSource.db);

      const result = await userService.getForumUsers(id);
      return result;
    },

    async messages({ id }, _, ctx) {
      authenticate(ctx);
      const messageService = getMessageServiceInstance(ctx.dataSource.db);

      const result = await messageService.getMessagesByForumId(id);
      return orderBy(result, 'createdAt', 'desc');
    },
  },
};
