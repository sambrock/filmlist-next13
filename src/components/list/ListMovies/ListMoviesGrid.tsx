export const ListMoviesGrid = (props: React.PropsWithChildren) => {
  return (
    <ul
      className="mb-44 grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-5 md:gap-2 lg:grid-cols-6 xl:grid-cols-7"
      suppressHydrationWarning={true}
    >
      {props.children}
    </ul>
  );
};
