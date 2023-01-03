const { rejects, deepStrictEqual } = require('assert');

const { error } = require('./src/constants');
const File = require('./src/file');

(async() => {
    {    
        const filePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath);
        const expected = [
            {
              "name": "Joao Lucas",
              "id": 123,
              "profession": "Javascript developer",
              "birthDay": 1997
            },
            {
              "name": "Crystiany",
              "id": 234,
              "profession": "Javascript specialist",
              "birthDay": 1992
            },
            {
              "name": "Joao Filipe",
              "id": 345,
              "profession": "Intern",
              "birthDay": 2002
            }
        ];
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})()