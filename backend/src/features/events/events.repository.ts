import { Event } from '@/database/schema/event';
import { CreateEventDto } from './events.types';
import { getEvents } from './events.handlers';
import { get } from 'http';

const eventsRepository = {
  createEvent: async (event: CreateEventDto) => {
    const newEvent = await Event.create({
      name: event.name,
      description: event.description,
      date: event.date,
      address: event.address,
      mapsUrl: event.mapsUrl,
      createdBy: event.userId,
      state: 'created',
      images: null,
    });

    return newEvent.id;
  },
  getEvents: async () => {
    const events = await Event.find();
    return events;
  },
  getEventById: async (id: string) => {
    const event = await Event.findById(id);
    return event;
  },
};

export { eventsRepository };
