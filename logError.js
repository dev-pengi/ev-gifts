const fs = require('fs');
const path = require('path');

/**
 * Logs an error to a log file, with one file per day.
 * @param {Error} error - The error object to be logged.
 */

module.exports = (error) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const fileName = `error-log-${year}-${month}-${day}.log`;
    const logDirectory = path.join(__dirname, 'errors');

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true }, (err) => {
            if (err) throw err;
            console.log(`Created the 'errors' directory.`);
        });
    }

    const errorMessage = `Time: ${hours}:${minutes}:${seconds}\nError: ${error.message}\nStack trace: ${error.stack}\n`;
    const separator = '----------------------------------------\n\n\n';

    fs.appendFile(path.join(logDirectory, fileName), separator + errorMessage, (err) => {
        if (err) throw err;
        console.log(`Error logged to file ${fileName}`);
    });
};