import { authResolvers } from "./auth.resolver";

export const resolvers = {
  Mutation: {
    ...authResolvers.Mutation,
  },
  Query: {
    ...authResolvers.Query,
  },
};
