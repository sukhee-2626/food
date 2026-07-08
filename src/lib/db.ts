export type Shop = {
  id: string;
  name: string;
  type: string;
  rating: number;
  isOpen: boolean;
  estimatedWaitTime: number; // in minutes
  logoUrl?: string;
  description: string;
};

export type MenuItem = {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  category: string;
  imageUrl?: string;
};

export type CartItem = {
  menuItem: MenuItem;
  quantity: number;
  options?: Record<string, string>;
};

export type OrderStatus = 'Placed' | 'Accepted' | 'Preparing' | 'Ready' | 'Collected' | 'Cancelled';

export type Order = {
  id: string;
  userId: string;
  shopId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  qrCodeToken?: string;
};

export type User = {
  id: string; // Roll number
  name: string;
  walletBalance: number;
  hostel?: string;
};

// --- Mock Data ---

export const mockUsers: User[] = [
  {
    id: "25BCS122",
    name: "John Doe",
    walletBalance: 1500, // Campus Wallet credits
    hostel: "Hostel J",
  }
];

export const mockShops: Shop[] = [
  {
    id: "shop_1",
    name: "SnackJack",
    type: "Quick Bites",
    rating: 4.5,
    isOpen: true,
    estimatedWaitTime: 12,
    description: "Your go-to for sandwiches, rolls, and quick snacks."
  },
  {
    id: "shop_2",
    name: "FoodJack",
    type: "Fast Food",
    rating: 4.2,
    isOpen: true,
    estimatedWaitTime: 25,
    description: "Burgers, wraps, and all the fried goodness."
  },
  {
    id: "shop_3",
    name: "Cafe Coffee Day",
    type: "Beverages",
    rating: 4.8,
    isOpen: true,
    estimatedWaitTime: 5,
    description: "Premium coffee and shakes."
  },
  {
    id: "shop_4",
    name: "Cafeteria Sai Foods",
    type: "Meals",
    rating: 4.0,
    isOpen: false,
    estimatedWaitTime: 0,
    description: "Full meals, thalis, and daily specials."
  }
];

export const mockMenuItems: MenuItem[] = [
  // SnackJack Items
  { id: "item_1", shopId: "shop_1", name: "Grilled Cheese Sandwich", description: "Classic grilled cheese", price: 60, isVeg: true, category: "Sandwiches" },
  { id: "item_2", shopId: "shop_1", name: "Chicken Tikka Roll", description: "Spicy chicken wrapped in paratha", price: 90, isVeg: false, category: "Rolls" },
  { id: "item_3", shopId: "shop_1", name: "French Fries", description: "Crispy salted fries", price: 50, isVeg: true, category: "Sides" },
  
  // FoodJack Items
  { id: "item_4", shopId: "shop_2", name: "Maharaja Veg Burger", description: "Double patty veg burger", price: 80, isVeg: true, category: "Burgers" },
  { id: "item_5", shopId: "shop_2", name: "Crispy Chicken Wrap", description: "Fried chicken tenders in tortilla", price: 110, isVeg: false, category: "Wraps" },
  
  // CCD Items
  { id: "item_6", shopId: "shop_3", name: "Cappuccino", description: "Rich espresso with steamed milk", price: 120, isVeg: true, category: "Hot Coffee" },
  { id: "item_7", shopId: "shop_3", name: "Cold Coffee", description: "Blended iced coffee", price: 100, isVeg: true, category: "Cold Beverages" },
  
  // Sai Foods
  { id: "item_8", shopId: "shop_4", name: "Veg Thali", description: "Roti, Dal, Sabzi, Rice, Papad", price: 70, isVeg: true, category: "Meals" },
  { id: "item_9", shopId: "shop_4", name: "Chicken Biryani", description: "Hyderabadi style biryani", price: 150, isVeg: false, category: "Meals" },
];

// In-memory store for orders (mutates during runtime)
export let mockOrders: Order[] = [];

// Helper functions (simulating DB queries)
export const getShopById = (id: string) => mockShops.find(s => s.id === id);
export const getMenuItemsByShopId = (shopId: string) => mockMenuItems.filter(m => m.shopId === shopId);
export const getUserById = (id: string) => mockUsers.find(u => u.id === id);

export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'qrCodeToken'>) => {
  const newOrder: Order = {
    ...orderData,
    id: `ord_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    qrCodeToken: `QR_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  };
  mockOrders.push(newOrder);
  return newOrder;
};

export const updateOrderStatus = (orderId: string, status: OrderStatus) => {
  const orderIndex = mockOrders.findIndex(o => o.id === orderId);
  if (orderIndex > -1) {
    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status,
      updatedAt: new Date()
    };
    return mockOrders[orderIndex];
  }
  return null;
};
