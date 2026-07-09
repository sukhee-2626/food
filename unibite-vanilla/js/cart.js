// js/cart.js

class CartManager {
  constructor() {
    this.storageKey = 'unibite_cart';
  }

  getCart() {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart) {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  addToCart(menuItem) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(i => i.menuItem.id === menuItem.id);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ menuItem, quantity: 1 });
    }
    
    this.saveCart(cart);
    this.showToast(`Added ${menuItem.name} to cart!`);
  }

  removeFromCart(itemId) {
    let cart = this.getCart();
    const existingIndex = cart.findIndex(i => i.menuItem.id === itemId);
    
    if (existingIndex > -1) {
      if (cart[existingIndex].quantity > 1) {
        cart[existingIndex].quantity -= 1;
      } else {
        cart = cart.filter(i => i.menuItem.id !== itemId);
      }
    }
    
    this.saveCart(cart);
    return cart; // return updated cart for UI
  }

  clearCart() {
    localStorage.removeItem(this.storageKey);
  }

  getTotal() {
    return this.getCart().reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  }

  // Simple toast notification for adding items
  showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '80px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'var(--text-primary)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '24px';
    toast.style.fontSize = '14px';
    toast.style.zIndex = '1000';
    toast.style.boxShadow = 'var(--shadow-md)';
    toast.style.animation = 'fadeIn 0.3s ease-out forwards';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
}

const cartManager = new CartManager();
