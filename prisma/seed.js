const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const list = require('./seed-data/list.json');
const movies = require('./seed-data/movie.json');
const listMovies = require('./seed-data/listMovies.json');
const sessions = require('./seed-data/session.json');

async function main() {
  const listsCreated = await prisma.list.createMany({
    data: list.map((l) => ({ ...l, createdAt: new Date(l.createdAt), updatedAt: new Date(l.updatedAt) })),
    skipDuplicates: true,
  });
  console.log(`Created ${listsCreated.count} lists`);

  const moviesCreated = await prisma.movie.createMany({
    data: movies.map((m) => ({ ...m, releaseDate: new Date(m.releaseDate) })),
    skipDuplicates: true,
  });
  console.log(`Created ${moviesCreated.count} movies`);

  const listMoviesCreated = await prisma.listMovies.createMany({
    data: listMovies.map((lm) => ({ ...lm, createdAt: new Date(lm.createdAt), updatedAt: new Date(lm.updatedAt) })),
    skipDuplicates: true,
  });
  console.log(`Created ${listMoviesCreated.count} listMovies`);

  const sessionsCreated = await prisma.session.createMany({
    data: sessions.map((s) => ({ ...s, createdAt: new Date(s.createdAt), updatedAt: new Date(s.updatedAt) })),
    skipDuplicates: true,
  });
  console.log(`Created ${sessionsCreated.count} sessions`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
