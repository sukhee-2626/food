"use server";

import { mockShops, mockMenuItems, getShopById, getMenuItemsByShopId, createOrder, updateOrderStatus, mockOrders, getUserById, OrderStatus } from "@/lib/db";

export async function getShops() {
  return mockShops;
}

export async function getShopDetails(id: string) {
  const shop = getShopById(id);
  const items = getMenuItemsByShopId(id);
  return { shop, items };
}

export async function placeOrder(userId: string, shopId: string, items: any[], totalAmount: number) {
  const user = getUserById(userId);
  if (!user) throw new Error("User not found");
  if (user.walletBalance < totalAmount) throw new Error("Insufficient wallet balance");

  // Deduct balance (mock)
  user.walletBalance -= totalAmount;

  // Create order
  const order = createOrder({
    userId,
    shopId,
    items,
    totalAmount,
    status: 'Placed'
  });

  return order;
}

export async function getVendorOrders(shopId: string) {
  return mockOrders.filter(o => o.shopId === shopId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function updateOrder(orderId: string, status: OrderStatus) {
  return updateOrderStatus(orderId, status);
}

export async function getStudentOrders(userId: string) {
  return mockOrders.filter(o => o.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getUser(userId: string) {
  return getUserById(userId);
}
