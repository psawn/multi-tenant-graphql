import { mapSchema } from "@graphql-tools/utils";
import { GraphQLSchema } from "graphql";

export function getAuthorizedSchema(schema: GraphQLSchema) {
  const authorizedSchema = mapSchema(schema, {
    "MapperKind.OBJECT_FIELD": (fieldConfig) => {
      return fieldConfig;
    },
  });

  return authorizedSchema;
}
