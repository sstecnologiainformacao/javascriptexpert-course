import { writeFile, readFile} from 'fs/promises';

export default class Repository {
    constructor() {}

    async save(data, url = './../database.json', path = import.meta.url) {
        const { pathname: databaseFile } = new URL(url, path);
        const currentData = JSON.parse(await readFile(databaseFile));
        currentData.push(data);
        await writeFile(databaseFile, JSON.stringify(currentData));
    }
};