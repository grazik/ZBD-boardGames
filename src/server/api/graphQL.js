import merge from 'lodash.merge';
import { ApolloServer } from 'apollo-server-express';
import { addressType, addressResolvers } from './resources/address/address.router';
import { userType, userResolvers } from './resources/user/user.router';
import { achievementType, achievementResolvers } from './resources/achievement/achievement.router';
import { shopType, shopResolvers } from './resources/shop/shop.router';
import { employeeType, employeeResolvers } from './resources/employee/employee.router';
import { boardGameType, boardGameResolvers } from './resources/boardGame/boardGame.router';
import { categoryType, categoryResolvers } from './resources/category/category.router';
import { rentedGameType, rentedGameResolvers } from './resources/rentedGame/rentedGame.router';

const typeDefs = [
        'type Query',
        'type Mutation',
        addressType,
        userType,
        achievementType,
        shopType,
        employeeType,
        boardGameType,
        categoryType,
        rentedGameType,
    ],

    resolvers = merge(
        {},
        addressResolvers,
        userResolvers,
        achievementResolvers,
        shopResolvers,
        employeeResolvers,
        boardGameResolvers,
        categoryResolvers,
        rentedGameResolvers,
    ),

    server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: !PRODUCTION,
    });

export default server;