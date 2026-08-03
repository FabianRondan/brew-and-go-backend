export interface OrderItemInput {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface CreateOrderInput {
  userId: string;
  items: OrderItemInput[];
}

export interface UpdateOrderStatusInput {
  status: 'PENDIENTE' | 'PREPARANDO' | 'LISTO' | 'ENTREGADO' | 'CANCELADO';
}