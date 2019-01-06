import userController from './user.controller';
import addressController from '../address/address.controller';
import employeeController from '../employee/employee.controller';

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

            promiseArray.push(userController.updateOne(userData));
            promiseArray.push(addressController.updateOne(ADDRESS));

            return Promise.all(promiseArray)
                .then(() => userController.getOne(userData.USER_ID))
                .catch(() => null);
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
    },
};

export default userResolvers;