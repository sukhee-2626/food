"use client";

import { useState } from "react";
import { mockShops } from "@/lib/db";
import Link from "next/link";

export default function Home() {
  const [shops] = useState(mockShops);

  return (
    <div className="app-container">
      <div className="main-content">
        <header className="mb-md">
          <h1 className="text-title">UniBite</h1>
          <p className="text-subtitle">What are you craving today?</p>
        </header>

        <section className="mt-lg">
          <h2 className="text-body font-bold mb-md">Campus Canteens</h2>
          <div className="flex-col gap-md">
            {shops.map((shop) => (
              <Link href={`/shop/${shop.id}`} key={shop.id}>
                <div className="card">
                  <div className="flex-row justify-between mb-md">
                    <div>
                      <h3 className="text-body font-bold">{shop.name}</h3>
                      <p className="text-small">{shop.type}</p>
                    </div>
                    {shop.isOpen ? (
                      <span className="badge success">Open</span>
                    ) : (
                      <span className="badge warning">Closed</span>
                    )}
                  </div>
                  <div className="flex-row justify-between align-center">
                    <p className="text-small text-secondary">
                      ★ {shop.rating.toFixed(1)}
                    </p>
                    {shop.isOpen && (
                      <div className="flex-row gap-sm">
                        <span className="text-small">Wait time:</span>
                        <span className="badge warning animate-pulse" style={{ animation: "pulse 2s infinite" }}>
                          ~{shop.estimatedWaitTime} min
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <nav className="bottom-nav">
        <Link href="/" className="bottom-nav-item active">
          <span>🏠</span>
          <span>Home</span>
        </Link>
        <Link href="/cart" className="bottom-nav-item">
          <span>🛒</span>
          <span>Cart</span>
        </Link>
        <Link href="/orders" className="bottom-nav-item">
          <span>📜</span>
          <span>Orders</span>
        </Link>
      </nav>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
