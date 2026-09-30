import type { Order } from '../types/order';

const API_URL = 'http://localhost:8080';

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(`${API_URL}/orders`);

  if (!response.ok) {
    throw new Error('Erro ao buscar pedidos');
  }

  return response.json();
}
