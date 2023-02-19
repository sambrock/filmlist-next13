import type { NextApiRequest, NextApiResponse } from 'next';

interface HandlerReq extends NextApiRequest {
  cookies: {
    session_token?: string;
  };
}

type Handlers = {
  get?: (req: HandlerReq, res: NextApiResponse) => void;
  post?: (req: HandlerReq, res: NextApiResponse) => void;
  put?: (req: HandlerReq, res: NextApiResponse) => void;
  delete?: (req: HandlerReq, res: NextApiResponse) => void;
  patch?: (req: HandlerReq, res: NextApiResponse) => void;
};

export const handler = (handlers: Handlers) => {
  return async (req: HandlerReq, res: NextApiResponse) => {
    try {
      switch (req.method) {
        case 'GET':
          return handlers.get ? handlers.get(req, res) : res.status(405).end();
        case 'POST':
          return handlers.post ? handlers.post(req, res) : res.status(405).end();
        case 'PUT':
          return handlers.put ? handlers.put(req, res) : res.status(405).end();
        case 'DELETE':
          return handlers.delete ? handlers.delete(req, res) : res.status(405).end();
        case 'PATCH':
          return handlers.patch ? handlers.patch(req, res) : res.status(405).end();
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
  constructor(public status: number, message: string) {
    super(message);
  }
}
