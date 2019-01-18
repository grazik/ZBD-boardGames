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
    }),
    numberOfNotReturnedGames = username => new Promise((resolve) => {
        pool.query(`SELECT COUNT(*) as result FROM RENTED_GAMES WHERE USER_ID = "${username}" and Returned = false`, (error, results) => {
            if (error || !results || !results[0]) {
                console.log(error);
                resolve(0);
            } else {
                resolve(results[0].result);
            }
        });
    });

export default {
    getGames,
    numberOfNotReturnedGames,
};