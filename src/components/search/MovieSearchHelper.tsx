import { Shortcut } from '../common/Shortcut';

export const MovieSearchHelper = ({ searchContainerRef }: { searchContainerRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <div className="flex items-center border-t border-black-500 px-2 py-1">
      <button className="flex cursor-pointer">
        <Shortcut>⌘L Load more</Shortcut>
      </button>

      <div className="ml-4 flex gap-4">
        <Shortcut>⏎ Add</Shortcut>
        {/* <Shortcut>⌘⏎ Add and close</Shortcut> */}
      </div>
    </div>
  );
};
