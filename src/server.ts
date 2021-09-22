require('dotenv').config();
import http = require("http");
var express = require("express");
var logger = require("morgan");
import { ApolloServer } from "apollo-server-express"
import client from "./client";
import pubsub from "./pubsub";
import schema from "./schema";
import { getUser } from "./users/users.utils";


const PORT = process.env.PORT;
const server = new ApolloServer({
    schema,
    context: async (ctx) => {
        if (ctx.req) {
            return {
                loggedInUser: await getUser(ctx.req.headers.token),
                client
            }
        } else {
            const { connection: { context } } = ctx
            return {
                loggedInUser: ctx.connection.context.loggedInUser
            }
        }
    },
    subscriptions: {
        onConnect: async (params: any) => {
            if (!params.token) {
                throw new Error("You can't listen!")
            }
            const loggedInUser = await getUser(params.token)
            return { loggedInUser }
        }
    }
})

const app = express();
app.use(logger("tiny"));
server.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})