import generateControllers from 'server/api/modules/query';
import pool from 'db';

const deleteOne = id => new Promise((resolve) => {
        const query = `DELETE FROM ADDRESSES WHERE ADDRESS_ID = (SELECT ADDRESS_ID FROM SHOPS WHERE SHOP_ID = "${id}")`;
        pool.query(query, (error, results) => {
            console.log(error, results);
            if (error || !results.affectedRows) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }),

    getEmployees = id => new Promise((resolve) => {
        pool.query(`SELECT EMPLOYEE_ID FROM EMPLOYEES where SHOP_ID = "${id}";`, (error, results) => {
            if (error || !results) {
                resolve([]);
            } else {
                const employees = [];
                results.forEach(employee => employees.push(employee.EMPLOYEE_ID));
                resolve(employees);
            }
        });
    }),

    clearEmployees = id => new Promise((resolve, reject) => {
        pool.query(`UPDATE EMPLOYEES SET SHOP_ID = 1 WHERE SHOP_ID = "${id}"`, (error, results) => {
            if (error || !results) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    }),

    addEmployees = (shopID, arrayOfEmployees) => new Promise((resolve, reject) => {
        if (arrayOfEmployees.length) {
            const employees = arrayOfEmployees.map(employee => `"${employee}"`),
                query = `UPDATE EMPLOYEES SET SHOP_ID = "${shopID}" WHERE EMPLOYEE_ID in (${employees.join(',')})`;

            pool.query(query, (error) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(true);
            });
        }
        resolve(false);
    });

export default generateControllers({
    table: 'SHOPS',
    ID: 'SHOP_ID',
}, {
    deleteOne,
    getEmployees,
    clearEmployees,
    addEmployees
});