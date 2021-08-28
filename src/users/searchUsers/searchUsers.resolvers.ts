
export default {
  Query: {
    searchUsers: async (_, { keyword }, {client}) =>
      client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      }),   
  },
};
