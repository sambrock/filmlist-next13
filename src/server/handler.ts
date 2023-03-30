import type { NextApiRequest, NextApiResponse } from 'next';

interface HandlerReq extends NextApiRequest {
  cookies: {
    session_token?: string;
    list_token?: string;
  };
}

interface HandlerRes extends NextApiResponse {
  //
}

type Handlers = {
  get?: (req: HandlerReq, res: HandlerRes) => Promise<void>;
  post?: (req: HandlerReq, res: HandlerRes) => Promise<void>;
  put?: (req: HandlerReq, res: HandlerRes) => Promise<void>;
  delete?: (req: HandlerReq, res: HandlerRes) => Promise<void>;
  patch?: (req: HandlerReq, res: HandlerRes) => Promise<void>;
};

export const handler = (handlers: Handlers) => {
  return async (req: HandlerReq, res: HandlerRes) => {
    try {
      switch (req.method) {
        case 'GET':
          return handlers.get ? await handlers.get(req, res) : res.status(405).end();
        case 'POST':
          return handlers.post ? await handlers.post(req, res) : res.status(405).end();
        case 'PUT':
          return handlers.put ? await handlers.put(req, res) : res.status(405).end();
        case 'DELETE':
          return handlers.delete ? await handlers.delete(req, res) : res.status(405).end();
        case 'PATCH':
          return handlers.patch ? await handlers.patch(req, res) : res.status(405).end();
        default:
          return res.status(405).end();
      }
    } catch (error) {
      if (error instanceof HandlerError) {
        return res.status(error.status).send(error);
      }
      console.error(error);
      return res.status(500).send('Server error');
    }
  };
};

export class HandlerError extends Error {
  constructor(public status: number, message?: string) {
    super(message);
  }
}
