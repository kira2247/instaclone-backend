import client from "../client";

export default {
    User: {
        totalFollowing: ({ id }, _, { client }) => client.user.count({
            where: {
                followers: {
                    some: {
                        id,
                    }
                }
            }
        }),

        totalFollowers: ({ id }, _, { client }) => client.user.count({
            where: {
                following: {
                    some: {
                        id,
                    }
                }
            }
        }),

        isMe: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }

            return id === loggedInUser.id
        },
        isFollowing: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            const exitsts = await client.user.count({
                where: {
                    username: loggedInUser.username,
                    following: {
                        some: {
                            id
                        }
                    }
                }
            });
            return Boolean(exitsts);
        },
        photos: ({ id }) => client.user.findUnique({
            where: {
                id
            }
        }).photos()
    }
}