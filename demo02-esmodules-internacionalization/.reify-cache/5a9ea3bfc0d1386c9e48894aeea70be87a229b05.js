"use strict";module.export({default:()=>TerminalController});var chalk;module.link("chalk",{default(v){chalk=v}},0);var chalkTable;module.link('chalk-table',{default(v){chalkTable=v}},1);var DraftLog;module.link("draftlog",{default(v){DraftLog=v}},2);var readline;module.link('readline',{default(v){readline=v}},3);var Person;module.link("./person.js",{default(v){Person=v}},4);





class TerminalController {
    constructor(
        paramConsole = null,
        paramPrint = {},
    ) {
        this.print = paramPrint;
        this.data = {};
        this.thisConsole = paramConsole || console
    }

    initializeTerminal(database, language) {
        DraftLog(this.thisConsole).addLineListener(process.stdin);
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.initializeTable(database, language);
    }

    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language));
        const table = chalkTable(this.getTableOption(), data);
        this.print = this.thisConsole.draft(table);
        this.data = data;
    }

    updateTable(item) {
        this.data = [...this.data, item];
        this.print(chalkTable(this.getTableOption(), this.data));
    }

    closeTerminal() {
        this.terminal.close();
    }

    question(msg = '') {
        return new Promise(resolve => this.terminal.question(msg, resolve));
    }

    getTableOption() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.white("ID") },
                { field: "vehicles", name: chalk.magenta("Vehicles") },
                { field: "kmTraveled", name: chalk.redBright("KM Traveled") },
                { field: "from", name: chalk.cyan("From") },
                { field: "to", name: chalk.green("To") },
            ]
        };
    }

}