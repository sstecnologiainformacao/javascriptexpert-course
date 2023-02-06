"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var TerminalController;module.link('../src/terminalController',{default(v){TerminalController=v}},1);

const { describe, it } = mocha;

describe('TerminalController', () => {

    it('Should initializete the table', async () => {
        const terminal = new TerminalController();

        const database = [{
            from: '2020-01-01',
            to: '2022-01-01',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20000',
            id: '1'
        }];

        terminal.initializeTable(database, 'pt-BR');
        console.log(terminal.data);
    });
});
