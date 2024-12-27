import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  income: BanknotesIcon,
  cost: BanknotesIcon,
  members: UserGroupIcon,
  transactions: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfTransactions,
    numberOfMembers,
    totalIncome,
    totalCost,
  } = await fetchCardData();
  return (
    <>
      <Card title="Total Income" value={totalIncome} type="income" />
      <Card title="Total Cost" value={totalCost} type="cost" />
      <Card title="Total Transactions" value={numberOfTransactions} type="transactions" />
      <Card title="Total Members" value={numberOfMembers} type="members"/>
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'transactions' | 'members' | 'income' | 'cost';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
