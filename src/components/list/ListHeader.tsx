type ListHeaderProps = {
  actions: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
};

export const ListHeader = (props: ListHeaderProps) => {
  return (
    <div className="group grid grid-cols-2 gap-2">
      <div className="col-span-2 col-start-1 opacity-100 focus-within:opacity-100 group-hover:opacity-100 md:opacity-0 ">
        {props.actions}
      </div>
      <div className="col-span-2 col-start-1 space-y-2 lg:col-span-1">
        {props.title}
        {props.description}
      </div>
    </div>
  );
};
