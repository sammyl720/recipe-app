import { ApolloServer } from 'apollo-server-micro'
import { getSession } from 'next-auth/client'
import Profile from '../../models/Profile'
import User from '../../models/User'
import db from '../../db'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import resolvers  from '../../graphql/resolvers'
import typeDefs from '../../graphql/schema'

let count = null;
const apolloServer = new ApolloServer({ 
  typeDefs, resolvers, 
  plugins: [ ApolloServerPluginLandingPageGraphQLPlayground({
    settings: {
      "request.credentials": "include"
    }
  })],
  context: async (ctx) => {
    const session = await getSession({ ctx })
    let profile = null;
    if (count === null) {
      count = await User.count()
    }
    if(session.user) {
      console.log(count)
      //@ts-ignore
       profile = await Profile.findOne({ user: session.user.id }).populate('user');
        if (!profile) {
          //@ts-ignore 
          profile = new Profile({ user: session.user.id })
          await profile.save().populate('user');
        }
    }
    return {
      ...ctx,
      db,
      session,
      profile
    }
  }
})

const startServer = apolloServer.start()

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}