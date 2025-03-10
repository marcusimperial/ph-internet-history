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
const url = process.env.URL;
const fetchData = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${url}${path}`);
        return yield res.json();
    }
    catch (e) {
        console.error('Error from fetch', e);
        return false;
    }
});
const validateJSONData = (data) => {
    if (!(data === null || data === void 0 ? void 0 : data.header) || typeof data.header !== 'object')
        return false;
    if (!(data === null || data === void 0 ? void 0 : data.sections) || !Array.isArray(data.sections))
        return false;
    // process header
    if (!data.header.title || typeof data.header.title !== 'string')
        return false;
    if (!data.header.image || typeof data.header.image !== 'object')
        return false;
    if (!data.header.image.alt || typeof data.header.image.alt !== 'string')
        return false;
    if (!data.header.image.path || typeof data.header.image.path !== 'string')
        return false;
    const processSectionData = (section) => {
        // manual validation check
        // title: string
        // description: string
        // image: { alt: string, path: string }
        if (!section.title || typeof section.title !== 'string')
            return false;
        if (!section.description || typeof section.description !== 'string')
            return false;
        if (!section.image || typeof section.image !== 'object')
            return false;
        if (!section.image.alt || typeof section.image.alt !== 'string')
            return false;
        if (!section.image.path || typeof section.image.path !== 'string')
            return false;
        return true;
    };
    // process sections
    for (const section of data.sections)
        if (!processSectionData(section))
            return false;
    // all checks passed => valid data
    return true;
};
const renderPastPageController = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetchData('/api/past');
    if (!data || !validateJSONData(data))
        return res.status(500).send('Fatal: Invalid data');
    return res.render('past', Object.assign(Object.assign({}, data === null || data === void 0 ? void 0 : data.header), { sections: data === null || data === void 0 ? void 0 : data.sections, isPast: true }));
});
const renderPresentPageController = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetchData('/api/present');
    if (!data || !validateJSONData(data))
        return res.status(500).send('Fatal: Invalid data');
    return res.render('present', Object.assign(Object.assign({}, data === null || data === void 0 ? void 0 : data.header), { sections: data === null || data === void 0 ? void 0 : data.sections, isPresent: true }));
});
const renderFuturePageController = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetchData('/api/future');
    if (!data || !validateJSONData(data))
        return res.status(500).send('Fatal: Invalid data');
    return res.render('future', Object.assign(Object.assign({}, data === null || data === void 0 ? void 0 : data.header), { sections: data === null || data === void 0 ? void 0 : data.sections, isFuture: true }));
});
const web = express_1.default.Router();
web.get('/past', renderPastPageController);
web.get('/present', renderPresentPageController);
web.get('/future', renderFuturePageController);
exports.default = web;
