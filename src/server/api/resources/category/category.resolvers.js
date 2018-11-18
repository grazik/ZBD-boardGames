import categoryController from './category.controller';

const categoryResolvers = {
    Query: {
        getCategory: (_, { id }) => categoryController.getOne(id),
        getCategories: () => categoryController.getAll(),
    },
};

export default categoryResolvers;