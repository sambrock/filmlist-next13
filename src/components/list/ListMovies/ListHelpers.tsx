import { Shortcut } from '@/components/common/Shortcut';

export const ListHelpers = () => {
  return (
    <div className="flex items-center gap-4">
      <Shortcut>⌘K Add film</Shortcut>
      <Shortcut>⌘Z Undo</Shortcut>
      <Shortcut>⌘⇧Z Redo</Shortcut>
      <Shortcut>⌘S Save</Shortcut>
    </div>
  );
};
