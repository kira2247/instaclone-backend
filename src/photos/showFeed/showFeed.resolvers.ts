import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        showFeed: protectedResolver((_, __, { loggedInUser, client }) => {
            return client.photo.findMany({
                where: {
                    OR: [
                        {
                            user: {
                                followers: {
                                    some: {
                                        id: loggedInUser.id
                                    }
                                }
                            }
                        },
                        {
                            userId: loggedInUser.id
                        }
                    ]
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        })
    }
}