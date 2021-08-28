

export default {
  Query: {
    showFollowers: async (_, { username, page }, {client}) => {
      const isUserOk = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!isUserOk) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const followers = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .followers({
          skip: (page - 1) * 5,
          take: 5,
        });
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
