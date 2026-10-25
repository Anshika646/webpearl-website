/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './store/CartContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
            <a href="/" className="border border-neutral-900 px-8 py-3 text-sm font-medium hover:bg-neutral-900 hover:text-white transition-colors">Return Home</a>
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

