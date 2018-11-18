import generateControllers from 'server/api/modules/query';
import pool from 'db';

const getAchievements = id => new Promise((resolve) => {
    pool.query(`SELECT * from ACHIEVEMENTS where NAME in (SELECT ACHIEVEMENT_NAME from CLIENT_ACHIEVEMENTS where CLIENT_ID = "${id}");`, (error, results) => {
        console.log(error);
        resolve(results);
    });
});

export default generateControllers(
    {
        table: 'CLIENTS',
        ID: 'CLIENT_ID',
    },
    { getAchievements },
);