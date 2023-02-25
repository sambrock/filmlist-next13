import { clsx } from 'clsx';
import { Plus_Jakarta_Sans } from '@next/font/google';

const logoFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-logo',
});

type HeaderProps = {
  search?: JSX.Element;
};

export const Header = ({ search }: HeaderProps) => {
  return (
    <header className="my-4 grid grid-cols-7 items-center">
      <h1 className={clsx(logoFont.variable, 'font-logo text-3xl font-black')}>filmq</h1>
      <div className="col-span-3 col-start-3">{search ? search : null}</div>
    </header>
  );
};
