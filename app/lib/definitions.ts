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
  title: string;
  accountant_book: string;
};

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
  accountant_book: string;
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

export enum AccountantBook {
  familyAccountantBook = '企鹅柴犬购物金',
  wifePersonalAccountantBook = '企鹅购物金',
  husbandPersonalAccountantBook = '柴犬购物金',
}

export const classAndSubClassMap: Record<string, string[]> = {
  '餐饮': [
    '午餐',
    '晚餐',
    '零食',
    '饮料',
    '其他',
  ],
  '交通': [
    '电车',
    '出租车',
    '其他',
  ],
  '生活': [
    '水道费',
    '电费',
    '燃气费',
    '其他',
  ],
};

export type TransactionForm = {
  id: string;
  member_id: string;
  amount: number;
  status: 'income' | 'cost';
  accountant_book: AccountantBook;
  class: string;
  sub_class: string;
  title: string;
  description: string;
  date: string;
};
