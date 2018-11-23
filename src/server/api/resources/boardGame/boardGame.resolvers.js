import boardGameController from './boardGame.controller';

const boardGameResolvers = {
    Query: {
        getGame: (_, { id }) => boardGameController.getOne(id),
        getGames: () => boardGameController.getAll(),
    },

    BoardGame: {
        CATEGORY(game) {
            return boardGameController.getGameCategories(game.GAME_ID);
        },
    },
};

export default boardGameResolvers;