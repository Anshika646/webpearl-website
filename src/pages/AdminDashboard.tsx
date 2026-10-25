import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('webpearll_orders') || '[]');
      setOrders(Array.isArray(stored) ? stored : []);
    } catch {
      setOrders([]);
    }
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    try {
      localStorage.setItem('webpearll_orders', JSON.stringify(updatedOrders));
    } catch {
      // Ignore storage quota / privacy mode errors
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-24 pb-20 text-[#1A1816]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl font-serif italic tracking-tighter mb-8 text-[#1A1816]">Admin Dashboard</h1>
        
        <div className="bg-[#FAF9F6] border border-[#EBE5DA] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F0EBE1] border-b border-[#EBE5DA] text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8C8275]">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">UPI TXN ID</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-[#8C8275] text-sm font-light">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} className="border-b border-[#EBE5DA] text-sm text-[#5C564D] font-light">
                      <td className="p-4 font-mono text-xs">{order.id}</td>
                      <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <div className="font-medium text-[#1A1816]">{order.customer.name}</div>
                        <div className="text-xs text-[#8C8275]">{order.customer.phone}</div>
                        <div className="text-xs text-[#8C8275]">{order.customer.email}</div>
                      </td>
                      <td className="p-4 font-serif italic text-[#1A1816]">{formatPrice(order.total)}</td>
                      <td className="p-4 font-mono text-xs">{order.transactionId}</td>
                      <td className="p-4">
                        {order.status === 'Pending' && <span className="inline-flex items-center gap-1 text-[#B89852] bg-[#FDF9EE] border border-[#F2E5C9] px-2 py-1 text-[9px] tracking-[0.1em] uppercase font-semibold"><Clock className="w-3 h-3"/> Pending</span>}
                        {order.status === 'Approved' && <span className="inline-flex items-center gap-1 text-[#4F6352] bg-[#EDF3EE] border border-[#D1E0D5] px-2 py-1 text-[9px] tracking-[0.1em] uppercase font-semibold"><CheckCircle2 className="w-3 h-3"/> Approved</span>}
                        {order.status === 'Rejected' && <span className="inline-flex items-center gap-1 text-[#8C4A4A] bg-[#F9EDED] border border-[#E9C7C7] px-2 py-1 text-[9px] tracking-[0.1em] uppercase font-semibold"><XCircle className="w-3 h-3"/> Rejected</span>}
                      </td>
                      <td className="p-4 flex gap-2">
                        {order.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'Approved')}
                              className="text-[9px] font-bold uppercase tracking-[0.2em] bg-[#4F6352] text-white px-3 py-2 hover:bg-[#3D4C40] transition-colors"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'Rejected')}
                              className="text-[9px] font-bold uppercase tracking-[0.2em] bg-[#8C4A4A] text-white px-3 py-2 hover:bg-[#6D3939] transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {order.status !== 'Pending' && (
                          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C8275]">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
