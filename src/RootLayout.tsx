import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function RootLayout() {
  return (
    <ReactLenis root>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <ScrollRestoration />
      </div>
    </ReactLenis>
  );
}
