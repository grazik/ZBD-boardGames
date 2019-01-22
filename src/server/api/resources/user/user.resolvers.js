import userController from './user.controller';
import addressController from '../address/address.controller';
import employeeController from '../employee/employee.controller';
import rentedGameController from '../rentedGame/rentedGame.controller';

const userResolvers = {
    Query: {
        getUser: (_, { id }) => userController.getOne(id),
        getUsers: (_, args) => userController.getAll(args),
        validate: (_, { id, pwd }) => userController.validateUser({
            id,
            pwd,
        }),
    },
    Mutation: {
        updateUser: (_, { input }) => {
            const { ADDRESS, ...userData } = input,
                promiseArray = [];

            if (Object.keys(userData).length > 1) {
                promiseArray.push(userController.updateOne(userData));
            }

            if (Object.keys(ADDRESS).length > 1) {
                promiseArray.push(addressController.updateOne(ADDRESS));
            }

            return Promise.all(promiseArray)
                .then(() => userController.getOne(userData.USER_ID))
                .catch(() => null);
        },
        deleteUser: (_, { id, isEmployee }) => {
            if (isEmployee) {
                return userController.deleteOne(id);
            }
            return false;
        },
        addUser: (_, { input }) => {
            const { ADDRESS, ...userData } = input;
            return addressController.addNew(ADDRESS)
                .then(addressID => userController.addNew({ ADDRESS_ID: addressID, ...userData }))
                .catch((err) => {
                    console.log(err);
                    return null;
                });
        },
    },
    User: {
        ADDRESS(user) {
            return addressController.getOne(user.ADDRESS_ID);
        },
        EMPLOYEE(user) {
            return employeeController.getOne(user.USER_ID)
                .then(result => (!!result));
        },
        HasEverythingReturned({ USER_ID }) {
            return rentedGameController.numberOfNotReturnedGames(USER_ID)
                .then(result => !result);
        },
    },
};

export default userResolvers;