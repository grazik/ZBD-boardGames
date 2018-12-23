import rentedGameController from './rentedGame.controller';
import clientController from '../client/client.controller';
import boardGameController from '../boardGame/boardGame.controller';

const rentedGameResolvers = {
    Query: {
        getRentedGames: (_, { id }) => rentedGameController.getGames(id),
    },
    RentedGame: {
        CLIENT(rentedGame) {
            return clientController.getOne(rentedGame.CLIENT_ID);
        },
        GAME(rentedGame) {
            return boardGameController.getOne(rentedGame.GAME_ID);
        },
    },
};

export default rentedGameResolvers;