import { Heebo } from '@next/font/google';
import { clsx } from 'clsx';

import '@/styles/global.css';

const sans = Heebo({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sans' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={clsx(sans.variable, 'bg-black px-6 py-6 font-sans text-white')}>{children}</body>
    </html>
  );
}
