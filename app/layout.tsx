// ** Styles **
import '@/styles/global.css';
// ** Common Components **
import Header from '@/components/common/Header';
import GlobalLayout from '@/components/common/GlobalLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Header />
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
