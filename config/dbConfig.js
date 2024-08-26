const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

let sql;

try {
    sql = postgres({
        host: PGHOST,
        database: PGDATABASE,
        username: PGUSER,
        password: PGPASSWORD,
        port: 5432,
        ssl: 'require',
        connection: {
            options: `project=${ENDPOINT_ID}`,
        },
    });
    console.log('Database connection established successfully.');
} catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Failed to connect to the database');
}

module.exports = sql;
