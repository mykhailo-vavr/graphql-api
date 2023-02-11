import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFile } from 'fs/promises';
import path from 'path';
import { ConfigKeysEnum, getConfig } from './utils';
import { context } from './context';
import { resolvers } from './graphql/resolvers';
import { scalars } from './graphql/scalars';
import { AppContext } from './context/type';

const setupServer = async () => {
  const typeDefs = await readFile(path.join(__dirname, '/graphql/schemas/index.graphql'), { encoding: 'utf-8' });

  const server = new ApolloServer<AppContext>({
    typeDefs,
    resolvers: {
      ...scalars,
      ...resolvers,
    },
  });

  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: getConfig(ConfigKeysEnum.PORT) },
  });

  return url;
};

setupServer()
  .then((url) => {
    console.info(`Server is available at ${url}`);
  })
  .catch(console.error);
