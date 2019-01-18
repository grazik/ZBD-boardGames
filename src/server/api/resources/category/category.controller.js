import pool from 'db';
import generateControllers from 'server/api/modules/query';

const addGameCategories = (gameID, categoriesID) => {
        if (categoriesID.length) {
            const insertValues = categoriesID.map(categoryID => `("${gameID}", "${categoryID}")`),
                query = `INSERT INTO GAME_CATEGORIES (GAME_ID, CATEGORY_ID) VALUES ${insertValues.join(',')};`;

            return pool.query(query, (error) => {
                if (error) {
                    return Promise.reject(error);
                }
                return Promise.resolve(true);
            });
        }
        return true;
    },

    deleteAllGameCategories = id => new Promise((resolve, reject) => {
        const query = `DELETE FROM GAME_CATEGORIES WHERE GAME_ID = "${id}";`;
        pool.query(query, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });

export default generateControllers({
    table: 'CATEGORIES',
    ID: 'CATEGORY_ID',
}, {
    addGameCategories,
    deleteAllGameCategories,
});