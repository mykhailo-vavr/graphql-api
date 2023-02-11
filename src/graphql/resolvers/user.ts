import { Resolvers } from '@/__generated__/graphql';
import { getForumServiceInstance, getUserServiceInstance } from '@/services';
import { authenticate } from '@/utils';

export const userResolvers: Resolvers = {
  Query: {
    async currentUser(_, __, ctx) {
      const { userId } = authenticate(ctx);
      const userService = getUserServiceInstance(ctx.dataSource.db);

      const result = await userService.getUserById(userId);

      if (!result) {
        throw new Error('There is no current user');
      }

      return result;
    },
  },

  User: {
    async forums(parent, _, ctx) {
      const forumService = getForumServiceInstance(ctx.dataSource.db);

      const result = await forumService.getUserForums(parent.id);
      return result;
    },
  },
};
