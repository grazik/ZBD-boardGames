import shopController from './shop.controller';
import addressController from '../address/address.controller';
import employeeController from '../employee/employee.controller';

const shopResolvers = {
    Query: {
        getShop: (_, { id }) => shopController.getOne(id),
        getShops: () => shopController.getAll(),
    },
    Mutation: {
        deleteShop: (_, { id, isEmployee }) => {
            if (isEmployee && id !== 1) {
                return shopController.clearEmployees(id)
                    .then(() => shopController.deleteOne(id));
            }
            return false;
        },
        updateShop: (_, { input, isEmployee }) => {
            if (isEmployee) {
                const { ADDRESS, ...shopData } = input,
                    promiseArray = [];

                promiseArray.push(addressController.updateOne(ADDRESS));
                promiseArray.push(shopController.clearEmployees(shopData.SHOP_ID)
                    .then(() => employeeController.getIDs(shopData.EMPLOYEES, 'EMPLOYEE_ID'))
                    .then(arrayOfEmployees => shopController.addEmployees(shopData.SHOP_ID, arrayOfEmployees))
                    .then((res) => {
                        console.log(res);
                        return true;
                    }));

                return Promise.all(promiseArray)
                    .then(() => true)
                    .catch((err) => {
                        console.log(err);
                        return false;
                    });
            }
            return false;
        },
        addShop: (_, { input, isEmployee }) => {
            if (isEmployee) {
                let shopID;
                const { ADDRESS, ...shopData } = input,
                    { EMPLOYEES, shopProperties } = shopData;

                return addressController.addNew(ADDRESS)
                    .then(addressID => shopController.addNew({ ADDRESS_ID: addressID, ...shopProperties }))
                    .then((id) => {
                        shopID = id;
                        return employeeController.getIDs(EMPLOYEES, 'EMPLOYEE_ID');
                    })
                    .then(arrayOfEmployees => shopController.addEmployees(shopID, arrayOfEmployees))
                    .then((res) => {
                        console.log(res);
                        if (res) {
                            return shopID;
                        }
                        return Promise.reject();
                    })
                    .catch((err) => {
                        console.log(err);
                        return null;
                    });
            }
            return null;
        },
    },
    Shop: {
        ADDRESS(shop) {
            return addressController.getOne(shop.ADDRESS_ID);
        },
        EMPLOYEES({ SHOP_ID }) {
            return shopController.getEmployees(SHOP_ID);
        },
        isNotCentral({ isCentral }) {
            return !isCentral;
        },
    },
};

export default shopResolvers;