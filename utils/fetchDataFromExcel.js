const XLSX = require('xlsx');

function readExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets['login_credentials'];
    const data = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON
    return data;
}

module.exports = readExcel;
