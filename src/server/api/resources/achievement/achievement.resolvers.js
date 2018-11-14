import achievementController from './achievement.controller';

const achievementResolvers = {
    Query: {
        getAchievement: (_, { id }) => achievementController.getOne(id),
        getAchievements: () => achievementController.getAll(),
    },
};

export default achievementResolvers;