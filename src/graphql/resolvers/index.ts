import { mergeResolvers } from '@graphql-tools/merge';
import { forumResolvers } from './forum';
import { requestResolvers } from './request';
import { userResolvers } from './user';
import { messageResolvers } from './message';

export const resolvers = mergeResolvers([forumResolvers, requestResolvers, userResolvers, messageResolvers]);
