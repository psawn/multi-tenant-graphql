import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { expressjwt } from "express-jwt";
import { AppConfig, validateEnv } from "./config";
import { createApolloServer } from "./graphql";
import { graphqlUploadExpress } from "graphql-upload-ts";
import { AppDataSource } from "./data-source";

async function createApp() {
  const app = express();

  app.use(
    expressjwt({
      algorithms: ["HS256"],
      secret: AppConfig.JWT_ACCESS_SECRET,
      credentialsRequired: false,
    })
  );

  const httpServer = http.createServer(app);

  const server = await createApolloServer(httpServer);

  app.use(
    "/graphql",
    graphqlUploadExpress(),
    cors<cors.CorsRequest>({
      origin: process.env.FRONTEND_ORIGINS,
      credentials: true,
    }),
    json({ limit: "10mb" }),
    expressMiddleware(server, {
      context: async ({ req }) => ({}),
    })
  );
  return app;
}

(async () => {
  await validateEnv();

  const app = await createApp();

  AppDataSource.initialize()
    .then(() => {
      app.listen({ port: AppConfig.PORT }, () =>
        console.log(
          `🚀 Server ready at http://localhost:${AppConfig.PORT}/graphql`
        )
      );
    })
    .catch((err: any) => console.log(err, "Error connecting"));
})();
