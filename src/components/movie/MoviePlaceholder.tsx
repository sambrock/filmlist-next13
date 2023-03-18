import { Shortcut } from '../common/Shortcut';

export const MoviePlaceholder = () => {
  return (
    <div className="flex aspect-poster items-center justify-center rounded-sm border border-dashed border-black-500">
      <div className="flex flex-col items-center gap-2">
        <Shortcut className="rounded-md bg-black-700 px-2 pt-1 pb-0.5">⌘K Add film</Shortcut>
        <Shortcut className="rounded-md bg-black-700 px-2 pt-1 pb-0.5">⌘Z Undo</Shortcut>
        <Shortcut className="rounded-md bg-black-700 px-2 pt-1 pb-0.5">⌘⇧Z Redo</Shortcut>
        <Shortcut className="rounded-md bg-black-700 px-2 pt-1 pb-0.5">⌘S Save</Shortcut>
      </div>
    </div>
  );
};
