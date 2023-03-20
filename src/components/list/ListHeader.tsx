type ListHeaderProps = {
  actions: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
};

export const ListHeader = (props: ListHeaderProps) => {
  return (
    <div className="group mb-4 grid grid-cols-2 gap-2">
      <div className="invisible col-span-2 col-start-1 transition-opacity group-hover:visible">{props.actions}</div>
      <div className="col-span-2 col-start-1 space-y-4 lg:col-span-1">
        {props.title}
        {props.description}
      </div>
    </div>
  );
};
