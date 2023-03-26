import { prisma } from '../prisma';

export const updateSessionListId = async (sessionId: string, listId: string) => {
  const data = await prisma.session.update({
    where: { id: sessionId },
    data: { listId },
  });

  return data;
};
