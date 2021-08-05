import Profile from '../models/Profile';

const resolvers = {
  Query: {
    async me(parent, args, context) {
      try {
        const { session } = context;
        if(session.user) {
          const profile = await Profile.findOne({ user: session.user.id });
          if (!profile) {
            const newProfile = new Profile({ user: session.user.id });
            await newProfile.save();
          }
          console.log(profile);
          return session.user;

        }
        return null;
      } catch (error) {
        console.log(error)
        return null
      }
    },
  },
}

export default resolvers