import { handler } from '@/server/handler';
import { getInitialListStoreData } from '@/server/list/getInitialListStoreData';


export default handler({
  get: async (req, res) => {
    const data = await getInitialListStoreData('qv8cerx845ku');

    return res.send(data);
  },
});
