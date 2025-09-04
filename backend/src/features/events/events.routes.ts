import express from 'express';
import { createEvent, getEventById, getEvents } from './events.handlers';

const eventsRouter = express.Router();
eventsRouter.post('/', createEvent);
eventsRouter.get('/', getEvents);
eventsRouter.get('/:id', getEventById);

export { eventsRouter };
