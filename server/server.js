import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./schemas/resolvers.js";
import { typeDefs } from "./schemas/typeDefs.js";
import connectDB from "./DB/db.js";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

// import schema from "./schemas/index.js";

dotenv.config();
const app = express();

app.use(cors());
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server ready on port", 4000);
