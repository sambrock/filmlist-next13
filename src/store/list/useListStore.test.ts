import { beforeEach, describe, expect, it } from 'vitest';
import type { ListMoviesWithMovie } from '@/pages/api/v1/getListMovies';
import type { GET_SearchMovies } from '@/pages/api/v1/searchMovies';
import { ListStore } from './store.types';
import { handleRedo, handleUndo, useListStore } from './useListStore';

const initialStoreData: ListStore['data'] = { list: { id: 'c837hga4enbs', title: 'Test list', token: 'secret_token', description: '', createdAt: new Date(), updatedAt: new Date(), userId: '', }, movies: new Map(), }; // prettier-ignore
const movies: GET_SearchMovies['data'] = [ { id: 671, title: "Harry Potter and the Philosopher's Stone", overview: "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths—and about the villain who's to blame.", originalLanguage: 'en', originalTitle: "Harry Potter and the Philosopher's Stone", releaseDate: new Date('2001-11-16T00:00:00.000Z'), posterPath: '/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg', backdropPath: '/hziiv14OpD73u9gAak4XDDfBKa2.jpg', director: 'Chris Columbus', }, { id: 767, title: 'Harry Potter and the Half-Blood Prince', overview: 'As Lord Voldemort tightens his grip on both the Muggle and wizarding worlds, Hogwarts is no longer a safe haven. Harry suspects perils may even lie within the castle, but Dumbledore is more intent upon preparing him for the final battle fast approaching. Together they work to find the key to unlock Voldemorts defenses and to this end, Dumbledore recruits his old friend and colleague Horace Slughorn, whom he believes holds crucial information. Even as the decisive showdown looms, romance blossoms for Harry, Ron, Hermione and their classmates. Love is in the air, but danger lies ahead and Hogwarts may never be the same again.', originalLanguage: 'en', originalTitle: 'Harry Potter and the Half-Blood Prince', releaseDate: new Date('2009-07-07T00:00:00.000Z'), posterPath: '/z7uo9zmQdQwU5ZJHFpv2Upl30i1.jpg', backdropPath: '/urDWNffjwmNi5IQaezw9GwqkUXa.jpg', director: 'David Yates', }, { id: 672, title: 'Harry Potter and the Chamber of Secrets', overview: 'Cars fly, trees fight back, and a mysterious house-elf comes to warn Harry Potter at the start of his second year at Hogwarts. Adventure and danger await when bloody writing on a wall announces: The Chamber Of Secrets Has Been Opened. To save Hogwarts will require all of Harry, Ron and Hermione’s magical abilities and courage.', originalLanguage: 'en', originalTitle: 'Harry Potter and the Chamber of Secrets', releaseDate: new Date('2002-11-13T00:00:00.000Z'), posterPath: '/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg', backdropPath: '/1stUIsjawROZxjiCMtqqXqgfZWC.jpg', director: 'Chris Columbus', }, { id: 674, title: 'Harry Potter and the Goblet of Fire', overview: "When Harry Potter's name emerges from the Goblet of Fire, he becomes a competitor in a grueling battle for glory among three wizarding schools—the Triwizard Tournament. But since Harry never submitted his name for the Tournament, who did? Now Harry must confront a deadly dragon, fierce water demons and an enchanted maze only to find himself in the cruel grasp of He Who Must Not Be Named.", originalLanguage: 'en', originalTitle: 'Harry Potter and the Goblet of Fire', releaseDate: new Date('2005-11-16T00:00:00.000Z'), posterPath: '/fECBtHlr0RB3foNHDiCBXeg9Bv9.jpg', backdropPath: '/8f9dnOtpArDrOMEylpSN9Sc6fuz.jpg', director: 'Mike Newell', }, ]; // prettier-ignore
const listMovies: ListMoviesWithMovie[] = movies.map((movie, index) => ({ id: movie.id, listId: initialStoreData.list.id, createdAt: new Date(), updatedAt: new Date(), movie, movieId: movie.id, order: index + 1, })); // prettier-ignore

describe('useListStore', () => {
  beforeEach(() => {
    useListStore.setState({
      data: initialStoreData,
      _latestPatch: [],
      _undoPointer: -1,
      _undoStack: [],
      _listMovieIds: new Set(),
    });
  });

  it('Should return the initial store data', () => {
    expect(useListStore.getState().data).toEqual(initialStoreData);
  });

  it('Dispatch action SET_TITLE should update the title', () => {
    const newTitle = 'New title';

    useListStore.getState().dispatch({ type: 'SET_TITLE', payload: newTitle });

    expect(useListStore.getState().data.list.title).toEqual(newTitle);
  });

  it('Dispatch action SET_DESCRIPTION should update the description', () => {
    const newDescription = 'New description';

    useListStore.getState().dispatch({ type: 'SET_DESCRIPTION', payload: newDescription });

    expect(useListStore.getState().data.list.description).toEqual(newDescription);
  });

  it('Dispatch action ADD_MOVIE should add a movie', () => {
    useListStore.getState().dispatch({ type: 'ADD_MOVIE', payload: movies[0] });

    expect(useListStore.getState().data.movies.size).toEqual(1);
    expect(useListStore.getState().data.movies.get(movies[0].id.toString())?.movie).toEqual(movies[0]);
  });

  it('Dispatch action REMOVE_MOVIE should remove a movie', () => {
    useListStore.getState().dispatch({ type: 'ADD_MOVIE', payload: movies[0] });

    useListStore.getState().dispatch({ type: 'REMOVE_MOVIE', payload: movies[0].id.toString() });

    expect(useListStore.getState().data.movies.size).toEqual(0);
  });

  it('Dispatch action ADD_MOVIES should add movies', () => {
    useListStore.getState().dispatch({ type: 'ADD_MOVIES', payload: listMovies });

    expect(useListStore.getState().data.movies.size).toEqual(listMovies.length);
    expect(useListStore.getState().data.movies.get(listMovies[0].movieId.toString())?.movie).toEqual(
      listMovies[0].movie
    );
  });

  it('handleUndo should undo the last action', () => {
    const initialStore = useListStore.getState().data;

    useListStore.getState().dispatch({ type: 'ADD_MOVIE', payload: movies[0] });
    handleUndo();

    expect(useListStore.getState().data).toEqual(initialStore);
  });

  it('handleRedo should redo the last action', () => {
    useListStore.getState().dispatch({ type: 'ADD_MOVIE', payload: movies[0] });
    const storeAfterAdd = useListStore.getState().data;

    handleUndo();
    handleRedo();

    expect(useListStore.getState().data).toEqual(storeAfterAdd);
  });

  it('handleUndo should not do anything if there is no action to undo', () => {
    const initialStore = useListStore.getState().data;

    handleUndo();

    expect(useListStore.getState().data).toEqual(initialStore);
  });

  it('handleRedo should not do anything if there is no action to redo', () => {
    const initialStore = useListStore.getState().data;

    handleRedo();

    expect(useListStore.getState().data).toEqual(initialStore);
  });
});
