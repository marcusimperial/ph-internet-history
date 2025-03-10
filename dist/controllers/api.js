"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const readJSONFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, promises_1.readFile)(path_1.default.join(__dirname, `../${filePath}`), 'utf-8');
        return JSON.parse(data);
    }
    catch (e) {
        console.error('Error reading file', e);
        return false;
    }
});
const getPastDataController = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield readJSONFile('models/past.json');
    if (!data)
        return res.status(500).json({ error: 'Error reading file' });
    return res.json(data);
});
const getPresentDataController = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield readJSONFile('models/present.json');
    if (!data)
        return res.status(500).json({ error: 'Error reading file' });
    return res.json(data);
});
const getFutureDataController = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield readJSONFile('models/future.json');
    if (!data)
        return res.status(500).json({ error: 'Error reading file' });
    return res.json(data);
});
const api = express_1.default.Router();
api.get('/past', getPastDataController);
api.get('/present', getPresentDataController);
api.get('/future', getFutureDataController);
exports.default = api;
