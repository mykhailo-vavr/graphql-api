import { db } from '@/db';
import { ContextFunction } from '@apollo/server';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { AppContext } from './type';

export const context: ContextFunction<[StandaloneServerContextFunctionArgument], AppContext> = async () => {
  // const { userId } = req.headers;

  return {
    userId: db.users[0].id,
    dataSource: {
      db,
    },
    // userId: userId === undefined ? userId : +userId,
  };
};
