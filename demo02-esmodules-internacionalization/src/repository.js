import { writeFile, readFile} from 'fs/promises';
import importMetaUrl from './importMetaUrl';

export default class Repository {
    constructor(getUrl = importMetaUrl) {}

    async save(data, url = './../database.json') {
        const { pathname: databaseFile } = new URL(url, this.getUrl());
        const currentData = JSON.parse(await readFile(databaseFile));
        currentData.push(data);
        await writeFile(databaseFile, JSON.stringify(currentData));
    }

};