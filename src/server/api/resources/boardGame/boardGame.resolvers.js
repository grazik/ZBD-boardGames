import boardGameController from './boardGame.controller';
import categoryController from '../category/category.controller';

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
        deleteGame: (_, { id, isEmployee }) => {
            if (isEmployee) {
                return boardGameController.deleteOne(id);
            }
            return false;
        },
        updateGame: (_, { input, isEmployee }) => {
            if (isEmployee) {
                const { GAME_ID, CATEGORY, ...properties } = input;
                return categoryController.deleteAllGameCategories(GAME_ID)
                    .then(() => categoryController.getIDs(CATEGORY, 'NAME'))
                    .then(catIDs => categoryController.addGameCategories(GAME_ID, catIDs))
                    .then(() => boardGameController.updateOne({
                        GAME_ID,
                        ...properties,
                    }))
                    .then(() => true)
                    .catch((err) => {
                        console.log(err);
                        return Promise.resolve(false);
                    });
            }
            return false;
        },
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