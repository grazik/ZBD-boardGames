import pool from 'db';

const getAll = table => () => Promise.resolve()
        .then(() => new Promise((resolve) => {
            pool.query(`SELECT * FROM ${table.toUpperCase()}`, (error, results) => {
                resolve(results);
            });
        })),

    getOne = ({ table, ID }) => id => Promise.resolve()
        .then(() => new Promise((resolve) => {
            pool.query(`SELECT * FROM ${table.toUpperCase()} WHERE ${ID} = "${id}"`, (error, results) => {
                resolve(results[0]);
            });
        }));

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