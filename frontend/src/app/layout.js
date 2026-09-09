import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { ToastProvider } from '../context/ToastContext';
import ScrollProgress from '../components/ScrollProgress';

export const metadata = {
  title: 'Muhammad Hassan Iqbal | Full Stack Developer Portfolio',
  description: 'Full Stack Developer specializing in React, Next.js, Node.js, Express, and MySQL. Building responsive digital experiences and high-performance platforms.',
  keywords: [
    'Muhammad Hassan Iqbal',
    'Full Stack Developer',
    'React.js',
    'Next.js',
    'Node.js',
    'Express.js',
    'MySQL',
    'Web Developer Portfolio',
    'JavaScript',
  ],
  authors: [{ name: 'Muhammad Hassan Iqbal' }],
  creator: 'Muhammad Hassan Iqbal',
  openGraph: {
    title: 'Muhammad Hassan Iqbal | Full Stack Developer',
    description: 'Portfolio of Muhammad Hassan Iqbal — Full Stack Developer specializing in React, Next.js, Node.js, and modern web architectures.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Muhammad Hassan Iqbal Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Hassan Iqbal | Full Stack Developer',
    description: 'Portfolio showcasing full-stack applications, scalable REST APIs, and modern responsive frontend designs.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <ThemeProvider>
          <ToastProvider>
            <ScrollProgress />
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
