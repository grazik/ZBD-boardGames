import shopController from './shop.controller';
import addressController from '../address/address.controller';

const shopResolvers = {
    Query: {
        getShop: (_, { id }) => shopController.getOne(id),
        getShops: () => shopController.getAll(),
    },
    Shop: {
        ADDRESS(shop) {
            return addressController.getOne(shop.ADDRESS_ID);
        },
    },
};

export default shopResolvers;