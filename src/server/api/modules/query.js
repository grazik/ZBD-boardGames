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
        console.log(properties);
        console.log(helpers.concatProperties(properties));
        const query = `UPDATE ${table.toUpperCase()} ${helpers.concatProperties(properties, 'SET')} WHERE ${ID} = "${properties[ID]}"`;
        pool.query(query, (error, results) => {
            if (error) {
                console.log(error);
                reject();
            } else {
                console.log(results);
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