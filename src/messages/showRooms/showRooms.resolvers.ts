import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        showRooms: protectedResolver(async (_, __, { loggedInUser, client }) =>
            client.room.findMany({
                where: {
                    users: {
                        some: {
                            id: loggedInUser.id
                        }
                    }
                }
            })
        )
    }
}