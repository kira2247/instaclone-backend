import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }, {client}
    ) => {
      try {
        // check if username or email are already exist.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });

        if (existingUser) {
          throw new Error("This username/email is already taken");
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
          },
        });

        // save and return new user
      } catch (e) {
        return e;
      }
    },
  },
};
