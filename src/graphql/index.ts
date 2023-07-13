import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { getAuthorizedSchema } from "./directives";
import { typeDefs } from "./typedefs";
import { resolvers } from "./resolvers";

export async function createApolloServer(httpServer: any) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const authorizedSchema = getAuthorizedSchema(schema);

  const server = new ApolloServer({
    schema: authorizedSchema,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  return server;
}
