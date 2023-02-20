import type { Session } from '@prisma/client';
import { prisma } from '../prisma';

export const updateSession = async (sessionId: string, session: Partial<Session>) => {
  const data = await prisma.session.update({
    where: { id: sessionId },
    data: session,
  });

  return data;
};
