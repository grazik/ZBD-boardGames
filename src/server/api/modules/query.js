import pool from 'db';
import helpers from '../../helpers';

const getAll = table => () => new Promise((resolve) => {
        pool.query(`SELECT * FROM ${table.toUpperCase()}`, (error, results) => {
            if (error || !results) {
                console.log(error);
                resolve(null);
            } else {
                resolve(results);
            }
        });
    }),

    getOne = ({ table, ID }) => id => new Promise((resolve) => {
        pool.query(`SELECT * FROM ${table.toUpperCase()} WHERE ${ID} = "${id}"`, (error, results) => {
            if (error || !results || !results[0]) {
                console.log(error);
                resolve(null);
            } else {
                resolve(results[0]);
            }
        });
    }),

    updateOne = ({ table, ID }) => properties => new Promise((resolve, reject) => {
        const { [ID]: id, ...toUpdate } = properties,
            query = `UPDATE ${table.toUpperCase()} ${helpers.concatProperties(toUpdate, 'SET')} WHERE ${ID} = "${id}"`;
        pool.query(query, (error) => {
            if (error) {
                console.log(error);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }),

    deleteOne = ({ table, ID }) => id => new Promise((resolve, reject) => {
        pool.query(`DELETE FROM ${table} where ${ID} = "${id}"`, (error, results) => {
            if (error || !results.affectedRows) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }),

    getIDs = ({ table, ID }) => (arrayOfValues, property) => new Promise((resolve, reject) => {
        const names = arrayOfValues.map(name => `"${name}"`),
            query = `SELECT ${ID} from ${table} WHERE \`${property}\` in (${names.join(',')});`;
        if (names.length) {
            pool.query(query, (error, results) => {
                if (error || !results) {
                    console.log(error);
                    reject(error);
                } else {
                    const IDs = results.map(result => result[ID]);
                    resolve(IDs);
                }
            });
        } else {
            resolve([]);
        }
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
        deleteOne: deleteOne({
            table,
            ID,
        }),
        getIDs: getIDs({
            table,
            ID,
        }),
    };

    return { ...defaults, ...overrides };
};