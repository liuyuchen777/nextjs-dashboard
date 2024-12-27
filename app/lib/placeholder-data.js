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

const members = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Yuchen Liu',
    email: 'liuyuchen.hust@gmail.com',
    image_url: '/members/chen-chen.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Zhengdan Lin',
    email: 'linzhengdan97@gmail.com',
    image_url: '/members/rin-rin.png',
  },
];

const transactions = [
  {
    member_id: members[0].id,
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
    member_id: members[1].id,
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
    member_id: members[0].id,
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
  members,
  transactions,
};
