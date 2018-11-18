import employeeController from './employee.controller';
import shopController from '../shop/shop.controller';
import userController from '../user/user.controller';

const employeeResolvers = {
    Query: {
        getEmployee: (_, { id }) => employeeController.getOne(id),
        getEmployees: () => employeeController.getAll(),
    },
    Employee: {
        SHOP(employee) {
            return shopController.getOne(employee.SHOP_ID);
        },
        USER(employee) {
            return userController.getOne(employee.EMPLOYEE_ID);
        }
    },
};

export default employeeResolvers;