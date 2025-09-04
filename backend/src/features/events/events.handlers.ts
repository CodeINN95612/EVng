import { ResponseWithLocals } from '@/types/locals';
import { Response, Request } from 'express';
import { CreateEventRequest, CreateEventResponse } from './events.types';
import { eventsRepository } from './events.repository';

export const createEvent = async (
  req: Request,
  res: ResponseWithLocals<CreateEventResponse>,
) => {
  const { userId } = res.locals;
  const event = req.body as CreateEventRequest;

  const eventId = await eventsRepository.createEvent({
    ...event,
    userId,
  });

  return res.status(201).send({ id: eventId });
};

export const getEvents = async (req: Request, res: Response) => {
  var events = await eventsRepository.getEvents();
  return res.status(200).send(events);
};

export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const event = await eventsRepository.getEventById(id);
  if (!event) {
    return res.status(404).send({ message: 'Event not found' });
  }
  return res.status(200).send(event);
};
