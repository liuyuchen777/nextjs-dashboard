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

export type Member = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Transaction = {
  id: string;
  member_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'income' | 'cost';
  class: string;
  sub_class: string;
  title: string;
  description: string;
  accountant_book: string;
};

export type LatestTransaction = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestTransaction, 'amount'> & {
  amount: number;
};

export type TransactionsTable = {
  id: string;
  member_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  title: string;
  status: 'income' | 'cost';
};

export type MembersTableType = {
  id: string;
  name: string;
  image_url: string;
  total_transactions: number;
  total_income: number;
  total_cost: number;
};

export type FormattedMembersTable = {
  id: string;
  name: string;
  image_url: string;
  total_transactions: number;
  total_income: string;
  total_cost: string;
};

export type MemberField = {
  id: string;
  name: string;
};

export type TransactionForm = {
  id: string;
  member_id: string;
  amount: number;
  status: 'income' | 'cost';
};
