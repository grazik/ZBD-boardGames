import generateControllers from 'server/api/modules/query';
import pool from 'db';

const getGameCategories = id => new Promise((resolve) => {
        pool.query(`SELECT NAME from CATEGORIES where CATEGORY_ID in (SELECT CATEGORY_ID from GAME_CATEGORIES where GAME_ID = ${id});`, (error, results) => {
            if (error || !results || !Array.isArray(results)) {
                resolve(null);
            } else {
                const categories = [];
                results.forEach(result => categories.push(result.NAME));
                resolve(categories);
            }
        });
    }),

    getFilteredGames = ({ categories, availability, min, max }) => new Promise((resolve) => {
        pool.query(`call Filter("${categories}", "${availability}", ${min === '6+' ? 7 : min}, ${max === '6+' ? 100 : max});`, (error, results) => {
            if (error || !results || !results[0]) {
                resolve(null);
            } else {
                resolve(results[0]);
            }
        });
    }),

    yourRating = (gameID, username) => new Promise((resolve) => {
        pool.query(`SELECT Rating from UserRatings WHERE User_ID = "${username}" and Game_ID = ${gameID};`, (error, results) => {
            if (error || !results || !Array.isArray(results)) {
                resolve(null);
            } else if (results.length) {
                resolve(results[0].Rating);
            } else {
                resolve(0);
            }
        });
    }),

    rentGame = ({ clientID, gameID }) => new Promise((resolve) => {
        pool.query(`SELECT RentGame('${clientID}', '${gameID}', null);`, (error, results) => {
            if (error || !results || !results[0]) {
                resolve(null);
            } else {
                resolve(Object.values(results[0])[0]);
            }
        });
    }),

    returnGame = gameID => new Promise((resolve) => {
        pool.query(`CALL ReturnGame(${gameID});`, (error) => {
            if (error) {
                resolve(0);
            } else {
                resolve(1);
            }
        });
    }),

    rateGame = ({ gameID, username, rating }) => new Promise((resolve) => {
        pool.query(`CALL RateGame("${username}", ${gameID}, ${rating}, @gameRating, @userRating);
         select @gameRating, @userRating;`, (error, results) => {
            if (error || !results || !results[1] || !results[1][0]) {
                resolve(null);
            } else {
                const result = results[1][0];
                resolve({
                    OPINION: result['@gameRating'],
                    YOUR_OPINION: result['@userRating'],
                });
            }
        });
    });

export default generateControllers(
    {
        table: 'BOARD_GAMES',
        ID: 'GAME_ID',
    },
    {
        getGameCategories,
        getFilteredGames,
        yourRating,
        rentGame,
        returnGame,
        rateGame,
    },
);