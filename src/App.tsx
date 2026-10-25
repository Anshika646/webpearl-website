/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, RouterProvider, createHashRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './store/CartContext';

function RouteErrorFallback() {
  return (
    <div className="min-h-screen bg-luxury-cream text-luxury-charcoal px-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-serif italic mb-4">Something went wrong</h1>
      <p className="text-luxury-text/70 mb-8 max-w-md text-sm">
        We encountered an unexpected issue loading this view. Please return to the homepage.
      </p>
      <Link
        to="/"
        className="bg-luxury-charcoal text-luxury-cream px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-luxury-rose transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "checkout", element: <Checkout /> },
      { path: "admin", element: <AdminDashboard /> },
      { 
        path: "*", 
        element: (
          <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-serif font-bold mb-4">404</h1>
            <p className="text-neutral-500 mb-8">Page not found</p>
            <Link to="/" className="border border-neutral-900 px-8 py-3 text-sm font-medium hover:bg-neutral-900 hover:text-white transition-colors">Return Home</Link>
          </div>
        )
      }
    ],
  },
]);

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

