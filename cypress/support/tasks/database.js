const { Pool } = require("pg");

const dbConfig = {
    host: "babar.db.elephantsql.com",
    user: "mvjrtkes",
    password: "4Z73C76NP-uhZvKRM5a-1R9kLLuNyINA",
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
