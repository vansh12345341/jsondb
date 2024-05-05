import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

type Entry = {
    id?: string;
    [key: string]: any;
};

const dbPath = path.join(__dirname, 'database.json');

const readDb = (): Entry[] => {
    try {
        return JSON.parse(fs.readFileSync(dbPath, 'utf8')) as Entry[];
    } catch (error) {
        return [];
    }
};

const writeDb = (data: Entry[]): void => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

export const getAll = (): Entry[] => {
    return readDb();
};

export const getOne = (id: string): Entry | undefined => {
    const data = readDb();
    return data.find(item => item.id === id);
};

export const getOneBy = (key: string, value: any): Entry | undefined => {
    const data = readDb();
    return data.find(item => item[key] === value);
};

export const getAllBy = (key: string, value: any): Entry[] => {
    const data = readDb();
    return data.filter(item => item[key] === value);
};

export const create = (entry: Entry): Entry => {
    const data = readDb();
    entry.id = uuidv4();  // Assign a unique ID
    data.push(entry);
    writeDb(data);
    return entry;
};

export const update = (id: string, newData: Partial<Entry>): Entry | null => {
    const data = readDb();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = { ...data[index], ...newData };
        writeDb(data);
        return data[index];
    }
    return null;
};

export const randomId = (): string => {
    return uuidv4();
};

export const writeAll = (data: Entry[]): void => {
    writeDb(data);
};
