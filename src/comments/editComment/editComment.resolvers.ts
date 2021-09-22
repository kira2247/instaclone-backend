import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        editComment: protectedResolver(async (_, { id, payload }, { loggedInUser, client }) => {
            const comment = await client.comment.findUnique({
                where: {
                    id
                }
            })
            if (!comment) {
                return {
                    ok: false,
                    error: "comment not found!"
                }
            }
            else if (comment.userId !== loggedInUser.id) {
                return {
                    ok: false,
                    error: "not authorized!"
                }
            } else {
                await client.comment.update({
                    where: {
                        id
                    },
                    data: {
                        payload
                    }
                })
                return {
                    ok: true
                }
            }
        })
    }
}