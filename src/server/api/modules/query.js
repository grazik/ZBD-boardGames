import pool from 'db';

const getAll = table => () => new Promise((resolve) => {
        pool.query(`SELECT * FROM ${table.toUpperCase()}`, (error, results) => {
            console.log(error);
            resolve(results);
        });
    }),

    getOne = ({ table, ID }) => id => new Promise((resolve) => {
        pool.query(`SELECT * FROM ${table.toUpperCase()} WHERE ${ID} = "${id}"`, (error, results) => {
            console.log(error);
            resolve(results[0]);
        });
    });

export default ({ table, ID }, overrides = {}) => {
    const defaults = {
        getAll: getAll(table),
        getOne: getOne({
            table,
            ID,
        }),
    };

    return { ...defaults, ...overrides };
};