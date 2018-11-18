import addressController from './address.controller';

const addressResolvers = {
    Query: {
        getAddress: (_, { id }) => addressController.getOne(id),
        getAddresses: () => addressController.getAll(),
    },
};

export default addressResolvers;