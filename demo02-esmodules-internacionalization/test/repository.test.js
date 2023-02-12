import mocha from 'mocha';
const { describe, it, afterEach } = mocha;
import sinon from 'sinon';
import importMetaUrl from '../src/importMetaUrl.js';

let sandbox = null;

import Repository from './../src/repository.js';

describe('Repository', () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    })

    it('Should save the data', async () => {
        const data = {
            from: '2020-01-01',
            to: '2022-01-01',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20000',
            id: '1'
        };

        const respository = new Repository({
            getUrl: () => ''
        });

        await respository.save(data, './database.test.json');
    })
});