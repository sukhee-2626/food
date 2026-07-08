"use client";

import { use, useState, useEffect } from "react";
import { getShopById, getMenuItemsByShopId, Shop, MenuItem } from "@/lib/db";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function ShopPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [shop, setShop] = useState<Shop | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // In a real app, this would be a fetch call
    const s = getShopById(resolvedParams.id);
    if (s) {
      setShop(s);
      setMenuItems(getMenuItemsByShopId(resolvedParams.id));
    }
  }, [resolvedParams.id]);

  if (!shop) return <div className="app-container p-md"><p>Loading shop...</p></div>;

  return (
    <div className="app-container">
      <div className="main-content animate-fade-in">
        <header className="mb-lg">
          <Link href="/" className="text-small mb-md inline-block">← Back to Campus</Link>
          <div className="flex-row justify-between align-center mt-md">
            <div>
              <h1 className="text-title">{shop.name}</h1>
              <p className="text-subtitle">{shop.type}</p>
            </div>
            {shop.isOpen && <span className="badge warning">Wait: ~{shop.estimatedWaitTime} min</span>}
          </div>
          <p className="text-body mt-md text-secondary">{shop.description}</p>
        </header>

        <section>
          <h2 className="text-body font-bold mb-md">Menu</h2>
          <div className="flex-col gap-sm">
            {menuItems.map((item) => (
              <div key={item.id} className="card flex-row justify-between align-center">
                <div>
                  <div className="flex-row gap-sm align-center">
                    <span className={item.isVeg ? "badge success" : "badge warning"} style={{ padding: '2px 6px', fontSize: '0.6rem' }}>
                      {item.isVeg ? "VEG" : "NON-VEG"}
                    </span>
                    <h3 className="text-body font-bold">{item.name}</h3>
                  </div>
                  <p className="text-small text-secondary mt-sm">{item.description}</p>
                  <p className="font-bold mt-sm">₹{item.price}</p>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ padding: '8px 16px', borderRadius: '8px' }}
                  onClick={() => addToCart(item)}
                >
                  ADD
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <nav className="bottom-nav">
        <Link href="/" className="bottom-nav-item">
          <span>🏠</span>
          <span>Home</span>
        </Link>
        <Link href="/cart" className="bottom-nav-item">
          <span>🛒</span>
          <span>Cart</span>
        </Link>
      </nav>
    </div>
  );
}
