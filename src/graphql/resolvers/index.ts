import { authResolvers } from "./auth.resolver";

export const resolvers = {
  Query: {
    ...authResolvers.Query,
  },
};
