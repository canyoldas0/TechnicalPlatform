import User from '../models/user.js';

const resolvers = {
  Query: {
    user: async (root, { id }) => {
      const user = await User.findById(id);
      return user;
    },
    allUsers: async () => {
      const users = await User.find();
      return users;
    },
    userExists: async (root, { email }) => {
      const user = await User.findOne({ email });
      return !!user;
    },
  },
  Mutation: {
    createUser: async (root, { name, email, password }) => {
      const user = new User({ name, email, password });
      await user.save();
      return user;
    },
    updateUser: async (root, { id, name, email, password }) => {
      const user = await User.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true }
      );
      return user;
    },
    deleteUser: async (root, { id }) => {
      const user = await User.findByIdAndDelete(id);
      return user;
    },
  },
};

export default resolvers;
