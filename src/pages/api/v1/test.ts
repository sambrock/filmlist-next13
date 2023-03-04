import { handler } from '@/server/handler';
import { getSearchMovies } from './searchMovies';

export default handler({
  get: async (req, res) => {
    const query = 'd:kubrick';

    const parsedQuery = await getSearchMovies(query);

    return res.send(parsedQuery);
  },
});
