import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { GraphQLSchema, GraphQLError } from "graphql";
import { defaultFieldResolver } from "graphql";
import { RolePermissions } from "./roles";
import { User } from "../entities/user.entity";

function isAuthorized(fieldPermissions: string[], user: User) {
  const userPermissions = RolePermissions[user?.role]?.permissions || [];

  const hasPermission = fieldPermissions.some((item: string) =>
    userPermissions.includes(item)
  );

  return hasPermission;
}

export function getAuthorizedSchema(schema: GraphQLSchema) {
  const authorizedSchema = mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
      // fieldName: signUp, signUp, ...
      // typeName: Query or Mutation

      const fieldAuthDirective = getDirective(schema, fieldConfig, "auth")?.[0]; // get the directive in file graphql
      const fieldPermissions = fieldAuthDirective?.permissions ?? [];

      if (fieldPermissions.length > 0) {
        const originalResolver = fieldConfig.resolve ?? defaultFieldResolver;

        fieldConfig.resolve = (source, args, context, info) => {
          const user = context.user;

          if (!isAuthorized(fieldPermissions, user)) {
            throw new GraphQLError("Unauthorized", {
              extensions: { code: "FORBIDDEN" },
            });
          }

          return originalResolver(source, args, context, info);
        };
      }

      return fieldConfig;
    },
  });

  return authorizedSchema;
}
