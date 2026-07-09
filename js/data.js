// js/data.js

const MOCK_USER = {
  id: "25BCS122",
  name: "John Doe",
  walletBalance: 1500,
  hostel: "Hostel J",
};

const MOCK_SHOPS = [
  {
    id: "shop_1",
    name: "SnackJack",
    type: "Quick Bites & Rolls",
    rating: 4.8,
    isOpen: true,
    estimatedWaitTime: 12,
    description: "Your go-to for sandwiches, rolls, and quick snacks on the go.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "shop_2",
    name: "FoodJack",
    type: "Premium Burgers",
    rating: 4.5,
    isOpen: true,
    estimatedWaitTime: 25,
    description: "Juicy burgers, crispy wraps, and all the fried goodness.",
    imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "shop_3",
    name: "Cafe Coffee Day",
    type: "Beverages & Cafe",
    rating: 4.9,
    isOpen: true,
    estimatedWaitTime: 5,
    description: "Premium brewed coffee, frappes, and light bites.",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "shop_4",
    name: "Sai Foods",
    type: "Authentic Meals",
    rating: 4.2,
    isOpen: false,
    estimatedWaitTime: 0,
    description: "Full wholesome meals, thalis, and daily specials.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
  }
];

const MOCK_MENU_ITEMS = [
  // SnackJack Items
  { id: "item_1", shopId: "shop_1", name: "Grilled Cheese Sandwich", description: "Classic melted cheese with toasted bread", price: 60, isVeg: true, imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300&q=80" },
  { id: "item_2", shopId: "shop_1", name: "Chicken Tikka Roll", description: "Spicy grilled chicken wrapped in paratha", price: 90, isVeg: false, imageUrl: "https://images.unsplash.com/photo-1626779836378-b118b6fc8e03?auto=format&fit=crop&w=300&q=80" },
  { id: "item_3", shopId: "shop_1", name: "Loaded French Fries", description: "Crispy fries with cheese and jalapeños", price: 70, isVeg: true, imageUrl: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=300&q=80" },
  
  // FoodJack Items
  { id: "item_4", shopId: "shop_2", name: "Maharaja Veg Burger", description: "Double veg patty with secret sauce", price: 80, isVeg: true, imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80" },
  { id: "item_5", shopId: "shop_2", name: "Crispy Chicken Wrap", description: "Fried chicken tenders in tortilla", price: 110, isVeg: false, imageUrl: "https://images.unsplash.com/photo-1626779836378-b118b6fc8e03?auto=format&fit=crop&w=300&q=80" },
  
  // CCD Items
  { id: "item_6", shopId: "shop_3", name: "Cappuccino", description: "Rich espresso with steamed milk foam", price: 120, isVeg: true, imageUrl: "https://images.unsplash.com/photo-1534685145892-3bc344078696?auto=format&fit=crop&w=300&q=80" },
  { id: "item_7", shopId: "shop_3", name: "Cold Coffee", description: "Blended iced coffee with cream", price: 100, isVeg: true, imageUrl: "https://images.unsplash.com/photo-1461023058943-07cb126df8eb?auto=format&fit=crop&w=300&q=80" },
];

function getShopById(id) {
  return MOCK_SHOPS.find(s => s.id === id);
}

function getMenuItemsByShopId(shopId) {
  return MOCK_MENU_ITEMS.filter(m => m.shopId === shopId);
}

// --- ORDER MANAGEMENT ---
class OrderManager {
  constructor() {
    this.storageKey = 'unibite_orders';
  }

  getOrders() {
    const orders = localStorage.getItem(this.storageKey);
    return orders ? JSON.parse(orders) : [];
  }

  saveOrders(orders) {
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }

  createOrder(userId, shopId, items, totalAmount) {
    const orders = this.getOrders();
    const newOrder = {
      id: `ord_${Math.random().toString(36).substr(2, 9)}`,
      qrToken: `QR_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId,
      shopId,
      items,
      totalAmount,
      status: 'Placed', // Placed, Preparing, Ready, Collected
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    this.saveOrders(orders);
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
      orders[orderIndex].status = newStatus;
      this.saveOrders(orders);
    }
  }

  getOrdersByShop(shopId) {
    return this.getOrders().filter(o => o.shopId === shopId);
  }
}

const orderManager = new OrderManager();
