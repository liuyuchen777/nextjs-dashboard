// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Yuchen Liu',
    email: 'liuyuchen.hust@gmail.com',
    image_url: '/customers/chen-chen.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Zhengdan Lin',
    email: 'linzhengdan97@gmail.com',
    image_url: '/customers/rin-rin.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'cost',
    date: '2022-12-06',
    class: '餐饮',
    sub_class: '午餐',
    title: '麦当劳',
    description: '',
    accountant_book: '企鹅柴犬账本',
  },
  {
    customer_id: customers[1].id,
    amount: 15795,
    status: 'cost',
    date: '2022-12-06',
    class: '餐饮',
    sub_class: '午餐',
    title: '麦当劳',
    description: '',
    accountant_book: '企鹅柴犬账本',
  },
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'income',
    date: '2022-12-06',
    class: '工资',
    sub_class: '亚马逊',
    title: '亚马逊12月工资',
    description: '',
    accountant_book: '企鹅柴犬账本',
  },
];

module.exports = {
  users,
  customers,
  invoices,
};
