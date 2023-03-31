import { Api } from '@/api/api.types';
import { handler } from '@/server/handler';
import { createList } from '@/server/list/createList';

export type POST_CreateList = Api.PostRoute<{
  url: '/api/v1/createList';
  body: null;
  data: Awaited<ReturnType<typeof createList>>;
}>;

export default handler({
  async post(req, res) {
    const list = await createList();

    return res.status(201).send(list);
  },
});
