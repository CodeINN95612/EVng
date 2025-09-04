export type CreateEventRequest = {
  name: string;
  description: string;
  date: Date;
  address: string;
  mapsUrl: string;
};

export type CreateEventDto = CreateEventRequest & {
  userId: string;
};

export type CreateEventResponse = {
  id: string;
};

export type ImageDto = {
  storage: 'local';
  file: File;
};
