import userController from './user.controller';
import addressController from '../address/address.controller';
import employeeController from '../employee/employee.controller';

const userResolvers = {
    Query: {
        getUser: (_, { username }) => userController.getOne(username),
        getUsers: (_, args) => userController.getAll(args),
        validate: (_, { id, pwd }) => userController.validateUser({
            id,
            pwd,
        }),
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