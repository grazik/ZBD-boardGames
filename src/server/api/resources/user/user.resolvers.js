import userController from './user.controller';
import addressController from '../address/address.controller';

const userResolvers = {
    Query: {
        getUser: (_, { id }) => userController.getOne(id),
        getUsers: () => userController.getAll(),
    },
    User: {
        ADDRESS(users) {
            return addressController.getOne(users.ADDRESS_ID);
        },
    },
};

export default userResolvers;