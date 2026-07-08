"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { mockUsers } from "@/lib/db";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, clearCart, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{qrToken: string, id: string} | null>(null);
  const user = mockUsers[0]; // Simulated logged in user

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate API delay
    setTimeout(() => {
      if (user.walletBalance >= total) {
        // In a real app, this hits the backend to create an order
        const mockQR = `QR_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const mockOrderId = `ord_${Math.random().toString(36).substr(2, 9)}`;
        setOrderComplete({ qrToken: mockQR, id: mockOrderId });
        clearCart();
      } else {
        alert("Insufficient wallet balance!");
      }
      setIsCheckingOut(false);
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="app-container">
        <div className="main-content flex-col align-center" style={{ justifyContent: 'center', textAlign: 'center', height: '100%' }}>
          <div className="badge success mb-md" style={{ fontSize: '1rem', padding: '10px 20px' }}>Order Placed!</div>
          <h2 className="text-title mb-md">Scan at Counter</h2>
          <div style={{ background: 'white', padding: '20px', borderRadius: '16px', display: 'inline-block', marginBottom: '20px' }}>
             {/* Mock QR Code visually */}
             <div style={{ width: '200px', height: '200px', background: 'linear-gradient(135deg, #000 25%, transparent 25%) -50px 0, linear-gradient(225deg, #000 25%, transparent 25%) -50px 0, linear-gradient(315deg, #000 25%, transparent 25%), linear-gradient(45deg, #000 25%, transparent 25%)', backgroundSize: '20px 20px', backgroundColor: '#fff' }}></div>
          </div>
          <p className="font-bold text-body mb-sm">{orderComplete.qrToken}</p>
          <p className="text-small text-secondary mb-lg">Order ID: {orderComplete.id}</p>
          <button className="btn-primary" onClick={() => setOrderComplete(null)}>
            Start New Order
          </button>
        </div>
        <nav className="bottom-nav">
          <Link href="/" className="bottom-nav-item">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          <Link href="/cart" className="bottom-nav-item active">
            <span>🛒</span>
            <span>Cart</span>
          </Link>
        </nav>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="main-content animate-fade-in">
        <header className="mb-lg">
          <h1 className="text-title">Your Cart</h1>
        </header>

        {items.length === 0 ? (
          <div className="flex-col align-center mt-lg text-secondary">
            <p>Your cart is empty.</p>
            <Link href="/" className="btn-secondary mt-md">Browse Shops</Link>
          </div>
        ) : (
          <>
            <div className="flex-col gap-sm">
              {items.map((item) => (
                <div key={item.menuItem.id} className="card flex-row justify-between align-center">
                  <div>
                    <h3 className="text-body font-bold">{item.menuItem.name}</h3>
                    <p className="text-small text-secondary">Qty: {item.quantity} × ₹{item.menuItem.price}</p>
                  </div>
                  <div className="flex-row gap-sm align-center">
                    <p className="font-bold">₹{item.menuItem.price * item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.menuItem.id)}
                      className="btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.8rem', borderRadius: '8px', color: 'var(--accent-color)', borderColor: 'var(--accent-color)' }}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="card mt-lg bg-secondary">
              <h3 className="text-body font-bold mb-md">Payment Details</h3>
              <div className="flex-row justify-between mb-sm">
                <span className="text-secondary">Item Total</span>
                <span>₹{total}</span>
              </div>
              <div className="flex-row justify-between mb-sm">
                <span className="text-secondary">Platform Fee</span>
                <span>₹5</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px dashed var(--border-color)', margin: '12px 0' }} />
              <div className="flex-row justify-between font-bold text-body mb-md">
                <span>To Pay</span>
                <span>₹{total + 5}</span>
              </div>

              <div className="flex-row justify-between align-center p-sm" style={{ background: 'rgba(56, 161, 105, 0.1)', borderRadius: '8px' }}>
                <div className="flex-col">
                  <span className="text-small font-bold" style={{ color: 'var(--success-color)' }}>Campus Wallet</span>
                  <span className="text-small text-secondary">Bal: ₹{user.walletBalance}</span>
                </div>
                {user.walletBalance >= total + 5 ? (
                  <span className="badge success">Sufficient</span>
                ) : (
                  <span className="badge warning">Low Balance</span>
                )}
              </div>
            </div>

            <button 
              className="btn-primary mt-lg" 
              style={{ width: '100%', padding: '16px' }}
              onClick={handleCheckout}
              disabled={isCheckingOut || user.walletBalance < total + 5}
            >
              {isCheckingOut ? 'Processing...' : `Pay ₹${total + 5} using Wallet`}
            </button>
          </>
        )}
      </div>

      <nav className="bottom-nav">
        <Link href="/" className="bottom-nav-item">
          <span>🏠</span>
          <span>Home</span>
        </Link>
        <Link href="/cart" className="bottom-nav-item active">
          <span>🛒</span>
          <span>Cart</span>
        </Link>
      </nav>
    </div>
  );
}
