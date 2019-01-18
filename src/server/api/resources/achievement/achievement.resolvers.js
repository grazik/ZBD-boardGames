import achievementController from './achievement.controller';

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
    },
};

export default achievementResolvers;