import { Request, Response } from "express";

type Person = {
  id: number;
};

export interface PersonReq extends Request {
  params: {
    id: string;
  };
}

export interface PersonRes extends Response {
  body: {
    status: string;
    person: Person;
  };
}

export interface IPersonController {
  createPerson: (req: Request, res: PersonRes) => void;
  getPersonById: (req: PersonReq, res: PersonRes) => void;
}
