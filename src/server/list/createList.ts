import { generateNanoId } from '@/utils';
import { prisma } from '../prisma';

export const createList = async () => {
  let exists = true;
  let listId = '';

  while (exists) {
    listId = generateNanoId();
    const list = await prisma.list.findUnique({ where: { id: listId } });
    if (!list) exists = false;
  }

  const list = await prisma.list.create({
    data: {
      id: listId,
      title: '',
    },
  });

  return list;
};
