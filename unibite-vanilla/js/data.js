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

const MOCK_MENU_ITEMS = [
  // SnackJack Items
  { id: "item_1", shopId: "shop_1", name: "Grilled Cheese Sandwich", description: "Classic grilled cheese", price: 60, isVeg: true },
  { id: "item_2", shopId: "shop_1", name: "Chicken Tikka Roll", description: "Spicy chicken wrapped in paratha", price: 90, isVeg: false },
  { id: "item_3", shopId: "shop_1", name: "French Fries", description: "Crispy salted fries", price: 50, isVeg: true },
  
  // FoodJack Items
  { id: "item_4", shopId: "shop_2", name: "Maharaja Veg Burger", description: "Double patty veg burger", price: 80, isVeg: true },
  { id: "item_5", shopId: "shop_2", name: "Crispy Chicken Wrap", description: "Fried chicken tenders in tortilla", price: 110, isVeg: false },
  
  // CCD Items
  { id: "item_6", shopId: "shop_3", name: "Cappuccino", description: "Rich espresso with steamed milk", price: 120, isVeg: true },
  { id: "item_7", shopId: "shop_3", name: "Cold Coffee", description: "Blended iced coffee", price: 100, isVeg: true },
];

function getShopById(id) {
  return MOCK_SHOPS.find(s => s.id === id);
}

function getMenuItemsByShopId(shopId) {
  return MOCK_MENU_ITEMS.filter(m => m.shopId === shopId);
}
