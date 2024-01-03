const path = require('path');
const fs = require('fs');
const fastcsv = require('fast-csv');
const db = require('../services/database');

const filepath = path.resolve(__dirname, '../public/exports', 'export.csv');
const ws = fs.createWriteStream(filepath);

const columns = [
    "ID",
    "EMAIL",
    "CONTENT",
    "STATUS",
    "CREATED_ON"
];

db.appDatabase.all(`select * from logs`, (error, rows) => {
    if (error) {
        return console.log(error.message);
    }
    fastcsv.write(rows, { headers: true }).on("finish", () => {
        console.log(`File exported to > ${filepath}`);
    }).pipe(ws);
});

// str_.pipe(writableStream);
