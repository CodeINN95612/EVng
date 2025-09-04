import { Response } from 'express';

interface Locals {
  userId: string;
}

type ResponseWithLocals<T> = Response<T, Locals>;

export { Locals };
export type { ResponseWithLocals };
