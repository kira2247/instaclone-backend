var jwt = require("jsonwebtoken");
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token: any) => {
    try {
        if (!token) {
            return null;
        }
        const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY)
        if ("id" in verifiedToken) {
            const user = await client.user.findUnique({
                where: {
                    id: verifiedToken["id"]
                }
            })
            if (user) {
                return user
            }
        }
        return null;
    } catch {
        return null
    }
}

export const protectedResolver = (ourResolver: Resolver) => (root: any, args: any, context: any, info: any) => {
    if (!context.loggedInUser) {
        const query = info.operation.operation === "query";
        if (query) {
            return null
        } else {
            return {
                ok: false,
                error: "Please login to perform this action"
            };
        }
    }
    return ourResolver(root, args, context, info)
}