require('dotenv').config();
var express = require("express");
var logger = require("morgan");
import { ApolloServer } from "apollo-server-express";
import client from "./client";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
            client
        }
    }
})

const app = express();
app.use(logger("tiny"));
server.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
app.listen({ port: PORT }, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})