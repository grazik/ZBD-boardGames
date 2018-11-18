import rentedGameController from './rentedGame.controller';
import clientController from '../client/client.controller';
import boardGameController from '../boardGame/boardGame.controller';
import employeeController from '../employee/employee.controller';

const rentedGameResolvers = {
    Query: {
        getRentedGames(_, args) {
            return rentedGameController.getGames(args);
        },
    },
    RentedGame: {
        CLIENT(rentedGame) {
            return clientController.getOne(rentedGame.CLIENT_ID);
        },
        EMPLOYEE(rentedGame) {
            return employeeController.getOne(rentedGame.EMPLOYEE_ID);
        },
        GAME(rentedGame) {
            return boardGameController.getOne(rentedGame.GAME_ID);
        },
    },
};

export default rentedGameResolvers;