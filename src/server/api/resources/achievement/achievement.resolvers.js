import achievementController from './achievement.controller';
import categoryController from '../category/category.controller';

const achievementResolvers = {
    Query: {
        getAchievement: (_, { id }) => achievementController.getOne(id),
        getAchievements: () => achievementController.getAll(),
    },
    Mutation: {
        deleteAchievement: (_, { id, isEmployee }) => {
            if (isEmployee) {
                return achievementController.deleteOne(id);
            }
            return false;
        },
        updateAchievement: (_, { input, isEmployee }) => {
            if (isEmployee) {
                return achievementController.updateOne(input)
                    .then(() => true)
                    .catch(() => false);
            }
            return false;
        },
        addAchievement: (_, { input, isEmployee }) => {
            if (isEmployee) {
                return achievementController.addNew(input)
                    .then(id => {
                        console.log(id);
                        return id;
                    });
            }
            return null;
        },
    },
};

export default achievementResolvers;