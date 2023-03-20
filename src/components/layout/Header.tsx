'use client';

import { DeleteOutlined, ExportOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Plus_Jakarta_Sans } from '@next/font/google';
import { clsx } from 'clsx';

import { Button } from '../common/Button';

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
    <header className="fade-black-gradient-180 container sticky top-0 z-30 mx-auto grid min-h-[70px] w-full grid-cols-7 items-start py-4">
      <div className="flex items-center self-center">
        <h1 className={clsx(logoFont.variable, 'font-logo text-3xl font-black')}>filmq</h1>
      </div>
      <div className="col-span-3 col-start-3 mx-4">{search ? search : null}</div>
      <div className="col-span-2 col-start-6 flex items-center self-center">
        <Button className="ml-auto" size="small" variant="transparent" icon={<ShareAltOutlined />}>
          Share
        </Button>
        <Button size="small" variant="transparent" icon={<ExportOutlined />}>
          Export
        </Button>
        <Button
          tone="custom"
          className="text-white/40 hover:bg-black-700 hover:text-red-500"
          size="small"
          variant="transparent"
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      </div>
    </header>
  );
};
