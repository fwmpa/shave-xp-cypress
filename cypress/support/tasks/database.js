const { Pool } = require("pg");
require('dotenv').config()

const db_host = process.env.DB_HOST
const db_pass = process.env.DB_PASS

const dbConfig = {
    host: db_host,
    user: "mvjrtkes",
    password: db_pass,
    database: "mvjrtkes",
    port: 5432,
};

module.exports = {
    removeUser(email) {
        return new Promise(function (resolve) {
            const pool = new Pool(dbConfig);
            pool.query(
                "DELETE from users where email = $1",
                [email],
                function (error, result) {
                    if (error) {
                        throw error;
                    }
                    resolve({ succces: result });
                }
            );
        });
    },
};
