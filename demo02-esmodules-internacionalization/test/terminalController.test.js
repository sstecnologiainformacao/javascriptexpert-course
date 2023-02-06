import mocha from 'mocha';
const { describe, it, beforeEach, afterEach } = mocha;
import chai from 'chai';
const { expect } = chai;
import sinon from 'sinon';

import TerminalController from '../src/terminalController';

let sandbox = null;

describe('TerminalController', () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    })

    it('Should initializete the table', async () => {
        const terminal = new TerminalController({
            draft: ( data ) => {},
        });

        const database = [{
            from: '2020-01-01',
            to: '2022-01-01',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20000',
            id: '1'
        }];

        terminal.initializeTable(database, 'pt-BR');

        const expected = [
            {
                id: 1,
                vehicles: 'Bike e Car',
                kmTraveled: '20.000 km',
                from: '01 de janeiro de 2020',
                to: '01 de janeiro de 2022'
            }
        ];

        expect(terminal.data).to.be.deep.equal(expected);
    });

    it('Should initializete the terminal', async () => {
        const terminal = new TerminalController({
            draft: ( data ) => {},
        });

        const database = [{
            from: '2020-01-01',
            to: '2022-01-01',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20000',
            id: '1'
        }];

        terminal.initializeTerminal(database, 'pt-BR');

        const expected = [
            {
                id: 1,
                vehicles: 'Bike e Car',
                kmTraveled: '20.000 km',
                from: '01 de janeiro de 2020',
                to: '01 de janeiro de 2022'
            }
        ];

        expect(terminal.data).to.be.deep.equal(expected);
    });

    it('Should update the table', async () => {
        const print = (info) => (newInfo) => null;

        const terminal = new TerminalController({
            draft: print,
        });

        const database = [{
            from: '2020-01-01',
            to: '2022-01-01',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20000',
            id: '1'
        }];

        const newData = {
            from: '2020-01-01',
            to: '2022-01-01',
            vehicles: ['Airplane'],
            kmTraveled: '20000',
            id: '2'
        };

        terminal.initializeTerminal(database, 'pt-BR');

        terminal.updateTable(newData);

        const expected = [
            {
                id: 1,
                vehicles: 'Bike e Car',
                kmTraveled: '20.000 km',
                from: '01 de janeiro de 2020',
                to: '01 de janeiro de 2022'
            },
            {
                from: '2020-01-01',
                to: '2022-01-01',
                vehicles: ['Airplane'],
                kmTraveled: '20000',
                id: '2'
            }
        ];

        expect(terminal.data).to.be.deep.equal(expected);
    });


    it('Should close terminal', async () => {
        const print = (info) => (newInfo) => null;

        const terminal = new TerminalController({
            draft: print,
        });

        const database = [{
            from: '2020-01-01',
            to: '2022-01-01',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20000',
            id: '1'
        }];

        terminal.initializeTerminal(database, 'pt-BR');

        terminal.closeTerminal();

        const expected = [
            {
                id: 1,
                vehicles: 'Bike e Car',
                kmTraveled: '20.000 km',
                from: '01 de janeiro de 2020',
                to: '01 de janeiro de 2022'
            }
        ];

        expect(terminal.data).to.be.deep.equal(expected);
    });

    it('Should show the question', async () => {
        const print = (info) => (newInfo) => null;

        const terminal = new TerminalController({
            draft: print,
        });

        const database = [{
            from: '2020-01-01',
            to: '2022-01-01',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20000',
            id: '1'
        }];

        terminal.initializeTerminal(database, 'pt-BR');

        terminal.question('Message to show');

        const expected = [
            {
                id: 1,
                vehicles: 'Bike e Car',
                kmTraveled: '20.000 km',
                from: '01 de janeiro de 2020',
                to: '01 de janeiro de 2022'
            }
        ];

        expect(terminal.data).to.be.deep.equal(expected);
    });
});
