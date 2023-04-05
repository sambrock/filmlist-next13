export const ModalDetailsCredit = ({ name, role }: { name: string; role: string }) => {
  return (
    <div className="flex items-end justify-between">
      <div className="whitespace-nowrap text-sm font-medium text-white/60">{name}</div>
      <div className="mx-2 mb-[6px] h-px w-full self-end border-b-2 border-dotted border-white/20" />
      <div className="whitespace-nowrap font-serif font-semibold italic text-white/60">{role}</div>
    </div>
  );
};
