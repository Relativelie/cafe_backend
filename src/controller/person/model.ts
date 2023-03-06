import { Request, Response } from "express";

type Person = {
  id: number;
};

export interface PersonReq extends Request {
  params: {
    id: string;
  };
}

export type PersonRes = Response<{
  person: Person;
}>;

export interface IPersonController {
  createPerson: (req: Request, res: PersonRes) => void;
  getPersonById: (req: PersonReq, res: PersonRes) => void;
}

export type User = {
  id: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
};
