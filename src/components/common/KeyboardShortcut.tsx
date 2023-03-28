export const KeyboardShortcut = ({ keys, label }: { keys: string[]; label?: string }) => {
  return (
    <span className="whitespace-nowrap text-xs text-white/40 font-medium">
      <span className="select-none rounded px-1">{keys.join(' ')}</span>
      {label && <span className="ml-1">{label}</span>}
    </span>
  );
};
