import type { Prisma } from '@prisma/client';
import { prisma } from '../prisma';
import { generateNanoId } from '@/utils';
import { SESSION_ID_LENGTH } from '@/constants';

export type Session = Prisma.SessionGetPayload<{
  include: {
    list: {
      select: { token: true };
    };
  };
}>;

export const initializeSession = async (listId?: string) => {
  const sessionId = generateNanoId(SESSION_ID_LENGTH);

  const session = await prisma.session.create({
    data: {
      id: sessionId,
      listId,
    },
    include: {
      list: {
        select: { token: true },
      },
    },
  });

  return session;
};
