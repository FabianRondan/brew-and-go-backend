export interface CreateTableInput {
  number: number;
  capacity: number;
}

export interface CreateReservationInput {
  userId: string;
  tableId: string;
  date: string;
  people: number;
}