import clientController from './client.controller';
import userController from '../user/user.controller';

const clientResolvers = {
    Query: {
        getClient: (_, { id }) => clientController.getOne(id),
        getClients: () => clientController.getAll(),
    },
    Client: {
        USER(client) {
            return userController.getOne(client.CLIENT_ID);
        },
        ACHIEVEMENTS(client) {
            return clientController.getAchievements(client.CLIENT_ID);
        },
    },
};

export default clientResolvers;