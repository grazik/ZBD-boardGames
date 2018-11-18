import generateControllers from 'server/api/modules/query';
import pool from 'db';

const getGameCategories = id => new Promise((resolve) => {
    pool.query(`SELECT NAME from CATEGORIES where CATEGORY_ID in (SELECT CATEGORY_ID from GAME_CATEGORIES where GAME_ID = ${id});`, (error, results) => {
        resolve(results.map(result => result.NAME)
            .join(' '));
        console.log(error);
    });
});

export default generateControllers(
    {
        table: 'BOARD_GAMES',
        ID: 'GAME_ID',
    },
    { getGameCategories },
);