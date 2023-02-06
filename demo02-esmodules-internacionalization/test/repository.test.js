import mocha from 'mocha';
const { describe, it, afterEach } = mocha;

import Repository from './../src/repository.js';

describe('Repository', () => {

    it('Should save the data', async () => {
        const data = {
            from: '2020-01-01',
            to: '2022-01-01',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20000',
            id: '1'
        };

        await new Repository().save(data, './database.test.json', '');
    })
});