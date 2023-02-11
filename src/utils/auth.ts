import { AppContext } from '@/context/type';
import { GraphQLError } from 'graphql';

export const authenticate = (ctx: AppContext) => {
  if (!ctx.userId) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }

  const user = ctx.dataSource.db.users.find(({ id }) => id === ctx.userId);

  if (!user) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }

  return {
    userId: ctx.userId,
  };
};
