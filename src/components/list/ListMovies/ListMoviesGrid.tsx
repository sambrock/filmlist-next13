export const ListMoviesGrid = (props: React.PropsWithChildren) => {
  return (
    <ul className="mb-44 grid grid-cols-7 gap-2" suppressHydrationWarning={true}>
      {props.children}
    </ul>
  );
};
