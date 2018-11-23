import pool from 'db';

const query = 'SELECT * FROM RENTED_GAMES',
    getGames = args => new Promise((resolve) => {
        const parts = [];
        Object.keys(args)
            .map(key => parts.push(`${key.toUpperCase()} = "${args[key]}"`));
        pool.query(`${query} ${parts.length ? ' WHERE ' : ''} ${parts.join(' AND ')};`, (error, results) => {
            resolve(results);
        });
    });

export default { getGames };