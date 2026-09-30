import { Client } from '@stomp/stompjs';
import type { Order } from '../types/order';

const WS_URL = 'ws://localhost:8080/ws';

export function connectToOrders(onOrderReceived: (order: Order) => void) {
  const client = new Client({
    brokerURL: WS_URL,

    reconnectDelay: 5000,

    onConnect: () => {
      console.log('WebSocket conectado');

      client.subscribe('/topic/orders', (message) => {
        const order: Order = JSON.parse(message.body);

        onOrderReceived(order);
      });
    },

    onDisconnect: () => {
      console.log('WebSocket desconectado');
    },

    onStompError: (frame) => {
      console.error('Erro STOMP:', frame.headers['message']);
      console.error(frame.body);
    },
  });

  client.activate();

  return () => {
    client.deactivate();
  };
}
