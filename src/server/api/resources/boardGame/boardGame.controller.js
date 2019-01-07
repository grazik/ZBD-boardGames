import generateControllers from 'server/api/modules/query';
import pool from 'db';

const getGameCategories = id => new Promise((resolve) => {
        pool.query(`SELECT NAME from CATEGORIES where CATEGORY_ID in (SELECT CATEGORY_ID from GAME_CATEGORIES where GAME_ID = ${id});`, (error, results) => {
            console.log(error);
            const categories = [];
            results.forEach(result => categories.push(result.NAME));
            resolve(categories);
        });
    }),

    getFilteredGames = ({ categories, availability, min, max }) => new Promise((resolve) => {
        pool.query(`call Filter("${categories}", "${availability}", ${min === '6+' ? 7 : min}, ${max === '6+' ? 100 : max});`, (error, results) => {
            console.log(error);
            resolve(results[0]);
        });
    }),

    yourRating = (gameID, username) => new Promise((resolve) => {
        pool.query(`SELECT Rating from UserRatings WHERE Client_ID = "${username}" and Game_ID = ${gameID};`, (error, results) => {
            console.log(error);
            if (results.length) {
                resolve(results[0].Rating);
            } else {
                resolve(0);
            }
        });
    }),

    rentGame = ({ clientID, gameID }) => new Promise((resolve) => {
        pool.query(`SELECT RentGame('${clientID}', '${gameID}', null);`, (error, results) => {
            console.log(error);
            resolve(Object.values(results[0])[0]);
        });
    }),

    returnGame = gameID => new Promise((resolve) => {
        try {
            pool.query(`CALL ReturnGame(${gameID});`, (error) => {
                console.log(error);
                resolve(1);
            });
        } catch (e) {
            resolve(0);
        }
    }),

    rateGame = ({ gameID, username, rating }) => new Promise((resolve) => {
        pool.query(`CALL RateGame("${username}", ${gameID}, ${rating}, @gameRating, @userRating);
         select @gameRating, @userRating;`, (error, results) => {
            const result = results[1][0];
            console.log(error);
            resolve({
                OPINION: result['@gameRating'],
                YOUR_OPINION: result['@userRating'],
            });
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