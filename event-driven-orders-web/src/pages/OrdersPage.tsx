import { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import { connectToOrders } from '../services/websocket';
import type { Order } from '../types/order';
import { OrderList } from '../components/OrderList';

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch {
        setError('Não foi possível carregar os pedidos.');
      } finally {
        setLoading(false);
      }
    }

    loadOrders();

    const disconnect = connectToOrders((newOrder) => {
      setOrders((currentOrders) => [
        ...currentOrders,
        newOrder
      ]);
    });

    return disconnect;
  }, []);

  if (loading) {
    return <p>Carregando pedidos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Pedidos</h1>

      <OrderList orders={orders} />
    </main>
  );
}