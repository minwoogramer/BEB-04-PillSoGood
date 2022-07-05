import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { resolvers, typeDefs } from "./graphql/schema";
import dotenv from "dotenv";
dotenv.config();

const PILL_SO_GOOD_SERVER_PORT = 4000;
const app = express();

const httpServer = http.createServer(app);
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function initApolloServer() {
  await apolloServer.start();
  // apollo server에 express 연동
  apolloServer.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PILL_SO_GOOD_SERVER_PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${PILL_SO_GOOD_SERVER_PORT}${apolloServer.graphqlPath}`
  );
}

void initApolloServer();