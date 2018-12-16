import generateControllers from 'server/api/modules/query';
import pool from 'db';

const getGameCategories = id => new Promise((resolve) => {
    pool.query(`SELECT NAME from CATEGORIES where CATEGORY_ID in (SELECT CATEGORY_ID from GAME_CATEGORIES where GAME_ID = ${id});`, (error, results) => {
        const categories = [];
        results.forEach(result => categories.push(result.NAME));
        resolve(categories);
    });
});

export default generateControllers(
    {
        table: 'BOARD_GAMES',
        ID: 'GAME_ID',
    },
    { getGameCategories },
);