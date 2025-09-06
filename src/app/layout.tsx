// app/layout.tsx
import { Suspense } from 'react';
import ViewportHandler from '@/components/viewhandler';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <ViewportHandler />
        </Suspense>
        {children}
      </body>
    </html>
  );
}