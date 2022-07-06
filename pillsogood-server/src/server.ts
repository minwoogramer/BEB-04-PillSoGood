import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { resolvers, typeDefs } from "./graphql/schema";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const PILL_SO_GOOD_SERVER_PORT = 4000;
const app = express();
const MongoDB_URL = "mongodb+srv://Myteraphy:1234@cluster0.9a8ix.mongodb.net/?retryWrites=true&w=majority"; 
const httpServer = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function initApolloServer() {
  
  await mongoose.connect(MongoDB_URL) // MongoDB와 서버 연결
  .then(() => {
    console.log("MongoDB Connection succeeded");
  })
  .catch((e: Error) => {            
    console.log("seq ERROR: ", e);
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });  // apollo server에 express 연동
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PILL_SO_GOOD_SERVER_PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${PILL_SO_GOOD_SERVER_PORT}${apolloServer.graphqlPath}`
  );
}

void initApolloServer();