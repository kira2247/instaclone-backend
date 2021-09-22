var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken")

export default {
  Mutation: {
    login: async (_, { username, password }, {client}) => {
      //find user with this username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      //compare password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect Password",
        };
      }
      //generate token
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
