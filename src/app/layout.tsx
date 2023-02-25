import { Heebo } from '@next/font/google';
import { clsx } from 'clsx';

import '@/styles/global.css';

const sans = Heebo({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sans' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={clsx(sans.variable, 'container mx-auto bg-black-900 px-4 font-sans text-white-text')}>
        {children}
      </body>
    </html>
  );
}
