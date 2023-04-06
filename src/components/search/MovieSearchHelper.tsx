import { KeyboardShortcut } from '../common/KeyboardShortcut';

export const MovieSearchHelper = ({ searchContainerRef }: { searchContainerRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <div className="flex items-center border-t border-neutral-600 px-2 py-1">
      <button className="flex cursor-pointer">
        <KeyboardShortcut defaultKeys={['Ctrl', 'L']} macosKeys={['⌘', 'L']} label="Load more" />
      </button>

      <div className="ml-4 flex gap-4">
        <KeyboardShortcut defaultKeys={['⏎']} label="Add" />
      </div>
    </div>
  );
};
