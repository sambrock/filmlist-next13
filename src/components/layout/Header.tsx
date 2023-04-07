import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = {
  saveIndicator?: React.ReactNode;
  search?: React.ReactNode;
  buttons?: React.ReactNode;
};

export const Header = ({ saveIndicator, buttons, search }: HeaderProps) => (
  <header className="fade-black-gradient-180 sticky top-0 z-30 mx-auto flex w-full items-center gap-4 py-2 md:grid md:min-h-[70px] md:grid-cols-7 md:items-start md:gap-0 md:py-4">
    <div className="col-span-2 col-start-1 flex items-center gap-4 self-center">
      <Link href={'/'} className="default-focus-shadow rounded">
        <Image src="/logo.svg" width="26" height="26" alt="logo" />
      </Link>
    </div>
    <div className="col-span-3 col-start-3 mx-4 hidden md:block">{search && search}</div>
    <div className="col-span-2 col-start-6 flex h-full w-full items-center justify-end md:items-center">
      {saveIndicator && saveIndicator}
      {buttons && buttons}
    </div>
  </header>
);
