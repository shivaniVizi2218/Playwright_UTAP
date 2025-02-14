// test/utils/fileHandler.js
const fs = require('fs');
const path = require('path');

class FileHandler {
    readFile(filePath) {
        const absolutePath = path.resolve(__dirname, filePath);
        return fs.readFileSync(absolutePath, 'utf8');
    }

    writeFile(filePath, data) {
        const absolutePath = path.resolve(__dirname, filePath);
        fs.writeFileSync(absolutePath, data, 'utf8');
    }
}

module.exports = new FileHandler();
