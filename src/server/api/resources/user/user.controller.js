import generateControllers from 'server/api/modules/query';
import pool from 'db';

const query = 'SELECT * FROM USERS',
    validateUser = ({ id, pwd }) => new Promise((resolve) => {
        pool.query(`${query} where USER_ID = "${id}" AND PASSWORD = "${pwd}";`, (error, results) => {
            resolve(results[0]);
        });
    });


export default generateControllers({
    table: 'USERS',
    ID: 'USER_ID',
}, { validateUser });