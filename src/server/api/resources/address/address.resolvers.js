import addressController from './address.controller';

const addressResolvers = {
    Query: {
        getAddress: (_, { id }) => addressController.getOne(id),
        getAddresses: () => addressController.getAll(),
    },
    Mutation: {
        updateAddress: (_, { id, input }) => addressController.updateOne(input)
            .then(() => addressController.getOne(id))
            .catch(() => {
                console.log('s');
                return null;
            }),
    },
};

export default addressResolvers;