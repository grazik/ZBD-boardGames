import boardGameController from './boardGame.controller';

const boardGameResolvers = {
    Query: {
        getGame: (_, { id }) => boardGameController.getOne(id),
        getGames: () => boardGameController.getAll(),
        getFilteredGames: (_, options) => boardGameController.getFilteredGames(options),
        rentGame: (_, options) => boardGameController.rentGame(options),
        returnGame: (_, { gameID }) => boardGameController.returnGame(gameID),
    },

    Mutation: {
        rateGame: (_, options) => boardGameController.rateGame(options),
    },

    BoardGame: {
        CATEGORY(game) {
            return boardGameController.getGameCategories(game.GAME_ID);
        },
        YOUR_OPINION(game, _, __, { variableValues }) {
            if (game.YOUR_OPINION) {
                return game.YOUR_OPINION;
            }
            return boardGameController.yourRating(game.GAME_ID, variableValues.username);
        },
    },
};

export default boardGameResolvers;