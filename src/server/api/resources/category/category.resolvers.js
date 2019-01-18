import categoryController from './category.controller';

const categoryResolvers = {
    Query: {
        getCategory: (_, { id }) => categoryController.getOne(id),
        getCategories: () => categoryController.getAll(),
    },
    Mutation: {
        deleteCategory: (_, { id, isEmployee }) => {
            console.log(isEmployee);
            if (isEmployee) {
                return categoryController.deleteOne(id);
            }
            return false;
        },
        updateCategory: (_, { input, isEmployee }) => {
            if (isEmployee) {
                return categoryController.updateOne(input);
            }
            return false;
        }
    },
};

export default categoryResolvers;