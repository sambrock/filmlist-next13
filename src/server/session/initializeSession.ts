import { prisma } from '../prisma';
import { generateNanoId } from '@/utils';
import { SESSION_ID_LENGTH } from '@/constants';

export const initializeSession = async (userId?: string, listId?: string) => {
  const sessionId = generateNanoId(SESSION_ID_LENGTH);

  const session = await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      listId,
    },
  });

  return session;
};
