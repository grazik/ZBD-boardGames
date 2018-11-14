import merge from 'lodash.merge';
import { ApolloServer } from 'apollo-server-express';
import { addressType, addressResolvers } from './resources/address/address.router';
import { userType, userResolvers } from './resources/user/user.router';
import { achievementType, achievementResolvers } from './resources/achievement/achievement.router';

const typeDefs = [
        'type Query',
        addressType,
        userType,
        achievementType,
    ],

    resolvers = merge(
        {},
        addressResolvers,
        userResolvers,
        achievementResolvers,
    ),

    server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: !PRODUCTION,
    });

export default server;