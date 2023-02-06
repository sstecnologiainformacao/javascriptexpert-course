"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var TerminalController;module.link('../src/terminalController',{default(v){TerminalController=v}},2);
const { describe, it } = mocha;

const { expect } = chai;



describe('TerminalController', () => {

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

        const newData = {
            from: '2020-01-01',
            to: '2022-01-01',
            vehicles: ['Airplane'],
            kmTraveled: '20000',
            id: '2'
        };

        terminal.initializeTerminal(database, 'pt-BR');
        terminal.updateTable(newData);
    });
});
