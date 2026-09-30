import type { Order } from '../types/order';
import { OrderCard } from './OrderCard';

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return <p>Nenhum pedido encontrado.</p>;
  }

  return (
    <div>
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}