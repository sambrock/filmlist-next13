import { Heebo, Source_Serif_Pro } from 'next/font/google';
import { clsx } from 'clsx';

import '@/styles/global.css';

const sans = Heebo({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sans' });
const serif = Source_Serif_Pro({ subsets: ['latin'], weight: ['400', '600', '700', '900'], variable: '--font-serif' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body
        className={clsx(
          serif.variable,
          sans.variable,
          'bg-neutral-900 font-sans text-off-white selection:bg-off-white selection:text-neutral-900'
        )}
      >
        <div className="px-2 xl:container md:px-4 xl:mx-auto">{children}</div>
      </body>
    </html>
  );
}
