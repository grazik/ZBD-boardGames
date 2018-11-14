import merge from 'lodash.merge';
import { ApolloServer } from 'apollo-server-express';
import { addressType, addressResolvers } from './resources/address/address.router';
import { userType, userResolvers } from './resources/user/user.router';

const typeDefs = [
        'type Query',
        addressType,
        userType,
    ],

    resolvers = merge(
        {},
        addressResolvers,
        userResolvers,
    ),

    server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: !PRODUCTION,
    });

export default server;