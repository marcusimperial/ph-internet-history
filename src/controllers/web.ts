import express, { Router, Request, Response } from 'express';

const baseUrl = process.env.BASE_URL!, port = process.env.PORT;

const fetchData = async (path: string) => {
    try {
        const res = await fetch(`${baseUrl}:${port}${path}`);
        return await res.json();
    } catch (e) {
        console.error('Error from fetch', e);
        return false;
    }
};

const validateJSONData = (data: Record<string, any>) => {
    if (!data?.header || typeof data.header !== 'object') return false;
    if (!data?.sections || !Array.isArray(data.sections)) return false;

    // process header
    if (!data.header.title || typeof data.header.title !== 'string') return false;
    if (!data.header.image || typeof data.header.image !== 'object') return false;
    if (!data.header.image.alt || typeof data.header.image.alt !== 'string') return false;
    if (!data.header.image.path || typeof data.header.image.path !== 'string') return false;

    const processSectionData = (section: Record<string, any>) => {
        // manual validation check
        // title: string
        // description: string
        // image: { alt: string, path: string }
        if (!section.title || typeof section.title !== 'string') return false;
        if (!section.description || typeof section.description !== 'string') return false;
        if (!section.image || typeof section.image !== 'object') return false;
        if (!section.image.alt || typeof section.image.alt !== 'string') return false;
        if (!section.image.path || typeof section.image.path !== 'string') return false;
        return true;
    };

    // process sections
    for (const section of data.sections) if (!processSectionData(section)) return false;

    // all checks passed => valid data
    return true;
};

const renderPastPageController = async (_: Request, res: Response) => {
    const data = await fetchData('/api/past') as Record<string, any>;
    if (!data || !validateJSONData(data)) return res.status(500).send('Fatal: Invalid data');
    return res.render('past', { ...data?.header, sections: data?.sections, isPast: true });
};

const renderPresentPageController = async (_: Request, res: Response) => {
    const data = await fetchData('/api/present') as Record<string, any>;
    if (!data || !validateJSONData(data)) return res.status(500).send('Fatal: Invalid data');
    return res.render('present', { ...data?.header, sections: data?.sections, isPresent: true });
};

const renderFuturePageController = async (_: Request, res: Response) => {
    const data = await fetchData('/api/future') as Record<string, any>;
    if (!data || !validateJSONData(data)) return res.status(500).send('Fatal: Invalid data');
    return res.render('future', { ...data?.header, sections: data?.sections, isFuture: true });
};

const web: Router = express.Router();

web.get('/past', renderPastPageController);
web.get('/present', renderPresentPageController);
web.get('/future', renderFuturePageController);

export default web;