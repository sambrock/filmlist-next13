import { Plus_Jakarta_Sans } from '@next/font/google';
import { clsx } from 'clsx';

const logoFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-logo',
});

type HeaderProps = {
  search?: React.ReactNode;
};

export const Header = ({ search }: HeaderProps) => {
  return (
    <header className="fade-black-gradient-180 sticky top-0 grid min-h-[70px] w-full grid-cols-7 items-center py-4">
      <div className="flex items-center">
        <h1 className={clsx(logoFont.variable, 'font-logo text-3xl font-black')}>filmq</h1>
      </div>
      <div className="col-span-3 col-start-3 mx-4">{search ? search : null}</div>
    </header>
  );
};
