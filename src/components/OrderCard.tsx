import type { Order } from '../types/order';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div>
      <strong>Pedido #{order.orderId}</strong>
      <p>{order.orderDescription}</p>
    </div>
  );
}