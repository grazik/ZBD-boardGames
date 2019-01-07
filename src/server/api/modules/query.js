import pool from 'db';
import helpers from '../../helpers';

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
    }),

    updateOne = ({ table, ID }) => properties => new Promise((resolve, reject) => {
        const { [ID]: id, ...toUpdate } = properties,
            query = `UPDATE ${table.toUpperCase()} ${helpers.concatProperties(toUpdate, 'SET')} WHERE ${ID} = "${id}"`;
        pool.query(query, (error, results) => {
            if (error) {
                console.log(error);
                reject();
            } else {
                resolve();
            }
        });
    });

export default ({ table, ID }, overrides = {}) => {
    const defaults = {
        getAll: getAll(table),
        getOne: getOne({
            table,
            ID,
        }),
        updateOne: updateOne({
            table,
            ID,
        }),
    };

    return { ...defaults, ...overrides };
};