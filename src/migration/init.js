const sqlite = require('sqlite3').verbose();
const path = require('path');

var db_path = path.resolve(__dirname, '../../', 'db.sqlite');

let db = new sqlite.Database(path.resolve(db_path), sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("error at db creation", db_path);
        console.log(err.message);
    }

    else {
        console.log("Connected to database");
        createTable();
    }
});


const createTable = () => {
    console.log("Creating table...");
    db.run(`
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            content TEXT NOT NULL,
            status TEXT NOT NULL,
            created_on DATETIME NOT NULL
        )
    `);
};