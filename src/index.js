// 2
const path = require('path');
const fs = require('fs');
const { parse } = require('csv');
const mailer = require('./services/mailer');

const sheetPath = path.resolve(__dirname, './public/sheets', `${process.argv[2]}.csv`);

const getAttachments = () => {
  let attachmentPaths = [];
  const file1 = process.argv[3];
  const file2 = process.argv[4];
  const file3 = process.argv[5];
  if (file1 && typeof file1 != undefined) {
    attachmentPaths.push({
      path: path.resolve(__dirname, './public/attachments', `${file1}`)
    });
    console.log(`Fetching ${file1} attachment`);
  }
  if (file2 && typeof file2 != undefined) {
    attachmentPaths.push({
      path: path.resolve(__dirname, './public/attachments', `${file2}`)
    });
    console.log(`Fetching ${file2} attachment`);
  }
  if (file3 && typeof file3 != undefined) {
    attachmentPaths.push({
      path: path.resolve(__dirname, './public/attachments', `${file3}`)
    });
    console.log(`Fetching ${file3} attachment`);
  }
  return attachmentPaths;
}



let contents = [];
fs.createReadStream(sheetPath)
  .pipe(parse(
    {
      delimiter: ",",
      from_line: 2
    }
  ))
  .on("data", (row) => {
    contents.push({ email: row[0], content: row[1] });
  })
  .on("finish", () => {
    mailer.getData(contents);
    mailer.sendEmail(getAttachments());
  })
  .on("error", function (error) {
    console.log(error.message);
  });

