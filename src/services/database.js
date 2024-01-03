const path = require('path');
const sqlite = require('sqlite3').verbose();
const moment = require('moment');
const db_path = path.resolve(__dirname, '../../', 'db.sqlite');

const appDatabase = new sqlite.Database(db_path, sqlite.OPEN_READWRITE, err => {
    if (err) {
        console.log(`Issue connecting to database...`);
    }
    console.log(`Connected to database... ${db_path}`);
});

module.exports = {
    saveData: (email, content) => {
        const currentTime = moment().utcOffset("+05:30").format('YYYY/MM/DD hh:mm:ss');
        return new Promise(async (resolve, reject) => {
            const sql = `
          INSERT INTO logs (
            email,
            content,
            status,
            created_on
          ) VALUES (?,?,?,?)
        `;
            try {
                appDatabase.run(sql, [email, content, 'Sent', currentTime], (err) => {
                    if (err) {
                        reject('Error while inserting data into logs');
                    }
                    resolve(`Data inserted into logs`);
                });
            } catch (error) {
                reject(error)
            }
        });
    },
    appDatabase
}