import generateControllers from 'server/api/modules/query';
import pool from 'db';

const query = 'SELECT * FROM USERS',
    validateUser = ({ id, pwd }) => new Promise((resolve) => {
        pool.query(`${query} where USER_ID = "${id}" AND PASSWORD = "${pwd}";`, (error, results) => {
            if (error || !results || !results[0]) {
                console.log(error);
                resolve(null);
            } else {
                resolve(results[0]);
            }
        });
    }),

    deleteOne = id => new Promise((resolve) => {
        const query = `DELETE FROM ADDRESSES WHERE ADDRESS_ID = (
                    SELECT ADDRESS_ID 
                    FROM USERS 
                    WHERE USER_ID="${id}" 
                    and USER_ID not in (
                        SELECT DISTINCT RENTED_GAMES.USER_ID 
                        FROM RENTED_GAMES
                        where Returned = 0)
                    );`;

        pool.query(query, (error, results) => {
            console.log(error, results);
            if (error || !results.affectedRows) {
                console.log(results);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });


export default generateControllers(
    {
        table: 'USERS',
        ID: 'USER_ID',
    },
    {
        validateUser,
        deleteOne,
    },
);