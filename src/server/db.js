import mysql from 'mysql';
import config from './config/config';

const { dbConfig } = config,
    pool = mysql.createPool({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
    });

pool.on('connection', () => {
    console.log('CONNECTED');
});

pool.on('acquire', (connection) => {
    console.log('Connection %d acquired', connection.threadId);
});

pool.on('release', (connection) => {
    console.log('Connection %d released', connection.threadId);
});

export default pool;