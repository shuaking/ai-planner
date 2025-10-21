import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';

export const metadata: Metadata = {
  title: {
    default: 'Next.js App',
    template: '%s | Next.js App',
  },
  description: 'App Router + Tailwind + shadcn/ui scaffold',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
