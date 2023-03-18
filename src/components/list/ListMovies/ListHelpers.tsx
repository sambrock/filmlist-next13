import { Shortcut } from '@/components/common/Shortcut';

export const ListHelpers = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Shortcut className="rounded-md bg-black-700 px-2 pt-1 pb-0.5">⌘K Add film</Shortcut>
      <Shortcut className="rounded-md bg-black-700 px-2 pt-1 pb-0.5">⌘Z Undo</Shortcut>
      <Shortcut className="rounded-md bg-black-700 px-2 pt-1 pb-0.5">⌘⇧Z Redo</Shortcut>
      <Shortcut className="rounded-md bg-black-700 px-2 pt-1 pb-0.5">⌘S Save</Shortcut>
    </div>
  );
};
