import { z } from 'zod';

import type { Api } from '@/api/api.types';
import { handler } from '@/server/handler';
import { supabase } from '@/server/supabase';

export type GET_GetExportImage = Api.GetRoute<{
  url: '/api/v1/getListMovies';
  params: z.input<typeof queryParamsSchema>;
  data: string;
}>;

const queryParamsSchema = z.object({
  listId: z.string().default(''),
});

export default handler({
  async get(req, res) {
    // const parsedQueryParams = queryParamsSchema.safeParse(req.query);
    // if (!parsedQueryParams.success) return res.send('');
    // // https://zrbwwfldzlttegneqhzw.supabase.co/storage/v1/object/public/media/posters/w342/lXvBgevABC9n5R6Gg76R3pN1h2M.jpg
    // const imageData = await supabase.storage.from('media').download('/posters/w342/lXvBgevABC9n5R6Gg76R3pN1h2M.jpg');
    // const imageBlob = imageData.data;
    // if (!imageBlob) return res.send('No blob');
    // const blobText = await imageBlob.text();
    // const base64img = Buffer.from(blobText).toString('base64');
    // // console.log('BUFFER', buffer);
    // // convert the buffer to a base64-encoded string
    // // const base64Image = buffer.toString('base64');
    // return res.setHeader('Content-Type', 'image/jpeg').send(blobText);
  },
});
