export const KeyboardShortcut = ({ keys, label }: { keys: string[]; label?: string }) => {
  return (
    <span className="whitespace-nowrap text-xs text-white/40">
      <span className="select-none rounded bg-white/10 px-1 font-medium">{keys.join('')}</span>
      {label && <span className="ml-1 font-medium">{label}</span>}
    </span>
  );
};
