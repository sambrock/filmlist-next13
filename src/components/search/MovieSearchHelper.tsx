import { userAgent } from '@/utils';
import { KeyboardShortcut } from '../common/KeyboardShortcut';

export const MovieSearchHelper = () => {
  const { isMobile } = userAgent();

  if (isMobile) return null;
  return (
    <div className="flex items-center gap-4 border-t border-neutral-600 px-2 py-1">
      <KeyboardShortcut defaultKeys={['Ctrl', 'L']} macosKeys={['⌘', 'L']} label="Load more" />
      <KeyboardShortcut defaultKeys={['⏎']} label="Add" />
    </div>
  );
};
