import { Heebo, Source_Serif_Pro } from 'next/font/google';
import { clsx } from 'clsx';

import '@/styles/global.css';

const sans = Heebo({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sans' });
const serif = Source_Serif_Pro({ subsets: ['latin'], weight: ['400', '600', '700', '900'], variable: '--font-serif' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
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
