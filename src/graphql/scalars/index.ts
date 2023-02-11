import { Resolvers } from '@/__generated__/graphql';
import { dateScalar } from './date';
import { UUIDScalar } from './uuid';

export const scalars: Resolvers = { Date: dateScalar, UUID: UUIDScalar };
