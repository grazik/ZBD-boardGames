import pool from 'db';

const getGames = id => new Promise((resolve) => {
    pool.query(`SELECT * FROM RENTED_GAMES WHERE CLIENT_ID="${id}" ORDER BY RENT_DATE DESC;`, (error, results) => {
        console.log(error);
        resolve(results);
    });
});

export default { getGames };