
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser, client }) => {
      const isUserOk = await client.user.findUnique({ where: { username } });
      if (!isUserOk) {
        return {
          ok: false,
          error: "That user is not exist",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
        error: "",
      };
    }),
  },
};
