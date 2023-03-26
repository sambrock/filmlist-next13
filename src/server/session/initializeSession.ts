import { prisma } from '../prisma';
import { generateNanoId } from '@/utils';
import { SESSION_ID_LENGTH } from '@/constants';

export const initializeSession = async (listId?: string) => {
  const sessionId = generateNanoId(SESSION_ID_LENGTH);

  const session = await prisma.session.create({
    data: {
      id: sessionId,
      listId,
    },
  });

  return session;
};
