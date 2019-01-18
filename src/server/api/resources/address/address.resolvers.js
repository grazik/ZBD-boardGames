import addressController from './address.controller';

const addressResolvers = {
    Query: {
        getAddress: (_, { id }) => addressController.getOne(id),
        getAddresses: () => addressController.getAll(),
    },
    Mutation: {
        updateAddress: (_, { input }) => addressController.updateOne(input)
            .then(() => addressController.getOne(input.ADDRESS_ID))
            .catch(() => null),
        addAddress: (_, { input }) => addressController.addNew(input),
    },
};

export default addressResolvers;