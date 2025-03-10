import express, { Router, Request, Response } from 'express';
import { readFile } from 'fs/promises';
import path from 'path';

const readJSONFile = async (filePath: string) => {
    try {
        const data = await readFile(path.join(__dirname, `../${filePath}`), 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        console.error('Error reading file', e);
        return false;
    }
};

const getPastDataController = async (_: Request, res: Response) => {
    const data = await readJSONFile('models/past.json');
    if (!data) return res.status(500).json({ error: 'Error reading file' });
    return res.json(data);
};

const getPresentDataController = async (_: Request, res: Response) => {
    const data = await readJSONFile('models/present.json');
    if (!data) return res.status(500).json({ error: 'Error reading file' });
    return res.json(data);
};

const getFutureDataController = async (_: Request, res: Response) => {
    const data = await readJSONFile('models/future.json');
    if (!data) return res.status(500).json({ error: 'Error reading file' });
    return res.json(data);
};

const api: Router = express.Router();

api.get('/past', getPastDataController);
api.get('/present', getPresentDataController);
api.get('/future', getFutureDataController);

export default api;