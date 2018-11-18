import userController from './user.controller';
import addressController from '../address/address.controller';
import employeeController from '../employee/employee.controller';

const userResolvers = {
    Query: {
        getUser: (_, { id }) => userController.getOne(id),
        getUsers: () => userController.getAll(),
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