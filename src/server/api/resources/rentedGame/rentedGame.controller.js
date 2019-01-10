import pool from 'db';

const getGames = id => new Promise((resolve) => {
    pool.query(`SELECT * FROM RENTED_GAMES WHERE USER_ID="${id}" ORDER BY RENT_DATE DESC;`, (error, results) => {
        if (error || !results) {
            console.log(error);
            resolve(null);
        } else {
            resolve(results);
        }
    });
});

export default { getGames };