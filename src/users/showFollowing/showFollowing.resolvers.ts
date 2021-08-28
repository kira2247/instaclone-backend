

export default {
  Query: {
    showFollowing: async (_, { username, lastId }, { client }) => {
      const isUserOk = await client.user.findUnique({
        where: {
          username,
        },
        select: { id: true },
      });
      if (!isUserOk) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const following = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
