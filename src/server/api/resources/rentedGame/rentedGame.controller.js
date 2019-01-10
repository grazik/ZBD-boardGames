import pool from 'db';

const getGames = id => new Promise((resolve) => {
    pool.query(`SELECT * FROM RENTED_GAMES WHERE CLIENT_ID="${id}" ORDER BY RENT_DATE DESC;`, (error, results) => {
        if (error || !results) {
            resolve(null);
        } else {
            resolve(results);
        }
    });
});

export default { getGames };