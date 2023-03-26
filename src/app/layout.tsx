import { Heebo, Source_Serif_Pro } from '@next/font/google';
import { clsx } from 'clsx';

import '@/styles/global.css';

const sans = Heebo({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sans' });
const serif = Source_Serif_Pro({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-serif' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={clsx(sans.variable, serif.variable, 'bg-black-900 font-sans text-white-text selection:text-black-900 selection:bg-white-text')}>
        <div className="px-2 md:px-4 xl:container xl:mx-auto">{children}</div>
      </body>
    </html>
  );
}
