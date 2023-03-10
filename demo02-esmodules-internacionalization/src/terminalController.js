import chalk from "chalk";
import chalkTable from 'chalk-table';
import DraftLog from "draftlog";
import readline from 'readline';
import Person from "./person.js";

export default class TerminalController {
    constructor(
        paramConsole = null,
    ) {
        this.print = {};
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