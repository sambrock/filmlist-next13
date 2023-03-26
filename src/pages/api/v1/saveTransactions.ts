import { z } from 'zod';

import { handler, HandlerError } from '@/server/handler';
import { convertToPrismaTransactions, transactionSchema } from '@/server/transactions/convertToPrismaTransactions';
import { prisma } from '@/server/prisma';
import { saveTransactionMedia } from '@/server/transactions/saveTransactionMedia';
import type { Api } from '@/api/api.types';
import { authListRequest } from '@/server/list/authListRequest';

export type POST_SaveTransactions = Api.PostRoute<{
  url: '/api/v1/saveTransactions';
  body: z.infer<typeof saveTransactionsSchema>;
  data: {};
}>;

const saveTransactionsSchema = z.object({
  listId: z.string(),
  transactions: transactionSchema.array(),
});

export default handler({
  async post(req, res) {
    const isAuthorized = authListRequest(req.body?.listId, req.cookies.session_token, req.cookies.list_token);
    if (!isAuthorized) throw new HandlerError(401, 'Unauthorized');

    const parsedBody = saveTransactionsSchema.safeParse(req.body);
    if (!parsedBody.success) throw new HandlerError(400, parsedBody.error.message);

    const { listId, transactions } = parsedBody.data;

    await prisma.$transaction(convertToPrismaTransactions(listId, transactions));
    await saveTransactionMedia(transactions);

    return res.status(200).send({});
  },
});
