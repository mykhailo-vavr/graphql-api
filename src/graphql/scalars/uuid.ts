import { GraphQLScalarType, Kind } from 'graphql';
import { validate } from 'uuid';

export const UUIDScalar = new GraphQLScalarType({
  name: 'UUID',
  description: 'UUID scalar type',

  serialize(value) {
    if (typeof value === 'string' && validate(value)) {
      return value;
    }

    throw new Error('GraphQL UUID Scalar serializer expected a valid UUID format');
  },

  parseValue(value) {
    if (typeof value === 'string' && validate(value)) {
      return value;
    }

    throw new Error('GraphQL UUID Scalar value parser expected a valid UUID format');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING && validate(ast.value)) {
      return ast.value;
    }

    throw new Error('GraphQL UUID Scalar literal parser expected a valid UUID format');
  },
});
