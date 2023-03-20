export const ListMoviesGrid = (props: React.PropsWithChildren) => {
  return (
    <ul className="mb-44 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {props.children}
    </ul>
  );
};
