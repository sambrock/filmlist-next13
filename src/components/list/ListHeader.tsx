type ListHeaderProps = {
  actions: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
};

export const ListHeader = (props: ListHeaderProps) => {
  return (
    <div className="group grid grid-cols-2 gap-2">
      <div className="opacity-0 col-span-2 col-start-1 group-hover:opacity-100 focus-within:opacity-100">{props.actions}</div>
      <div className="col-span-2 col-start-1 space-y-4 lg:col-span-1">
        {props.title}
        {props.description}
      </div>
    </div>
  );
};
