import { Request, Response } from 'express';

export class TicketController {
  // DI - WssService
  constructor() {}

  public getTickets = async (req: Request, res: Response) => {
    return res.json('getTickets');
  };

  public getLastTicketNumber = async (req: Request, res: Response) => {
    return res.json('getLastTicketNumber');
  };

  public pendingTickets = async (req: Request, res: Response) => {
    return res.json('pendingTickets');
  };

  public createTicket = async (req: Request, res: Response) => {
    return res.json('createTicket');
  };

  public drawTicket = async (req: Request, res: Response) => {
    return res.json('drawTicket');
  };

  public ticketFinished = async (req: Request, res: Response) => {
    return res.json('ticketFinished');
  };

  public workingOn = async (req: Request, res: Response) => {
    return res.json('workingOn');
  };
}
