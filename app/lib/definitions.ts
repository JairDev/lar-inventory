// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type ProductsTable = {
  id: string;
  name: string;
  buy_price_dollar: number;
  buy_price_bs: number;
  quantity: number;
  pvp: number;
  revenue: number;
  sell_price: number;
};

export type ProductField = {
  name: string;
  buy_price_dollar: number;
  quantity: number;
  revenue: number;
};

export type ProductForm = {
  id: string;
  name: string;
  buy_price_dollar: number;
  quantity: number;
  revenue: number;
};

export type DollarForm = {
  id: string;
  current_price: number;
};
