import { Plus_Jakarta_Sans } from '@next/font/google';
import { clsx } from 'clsx';

const logoFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-logo',
});

type HeaderProps = {
  search?: React.ReactNode;
  buttons?: React.ReactNode;
};

export const Header = ({ buttons, search }: HeaderProps) => (
  <header className="fade-black-gradient-180 sticky top-0 z-30 mx-auto flex w-full items-center gap-4 py-2 md:grid md:min-h-[70px] md:grid-cols-7 md:items-start md:gap-0 md:py-4">
    <div className="flex items-center self-center">
      <h1 className={clsx(logoFont.variable, 'font-logo text-3xl font-black')}>filmq</h1>
    </div>
    <div className="col-span-3 col-start-3 mx-4 hidden md:block">{search && search}</div>
    <div className="col-span-2 col-start-6 flex w-full items-center justify-end md:items-end">{buttons && buttons}</div>
  </header>
);
