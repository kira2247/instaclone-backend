import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(async (_, { username }, { loggedInUser, client }) => {
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
            disconnect: {
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
