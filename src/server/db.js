import mysql from 'mysql';
import config from './config/config';

const { dbConfig } = config,
    pool = mysql.createPool({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        connectionLimit: 4,
    });

export default pool;