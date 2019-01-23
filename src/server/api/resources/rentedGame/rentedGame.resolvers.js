import rentedGameController from './rentedGame.controller';
import userController from '../user/user.controller';
import boardGameController from '../boardGame/boardGame.controller';

const rentedGameResolvers = {
    Query: {
        getRentedGames: (_, { id }) => rentedGameController.getGames(id),
    },
    RentedGame: {
        USER(rentedGame) {
            return userController.getOne(rentedGame.CLIENT_ID);
        },
        GAME(rentedGame) {
            return boardGameController.getOne(rentedGame.GAME_ID);
        },
    },
};

export default rentedGameResolvers;