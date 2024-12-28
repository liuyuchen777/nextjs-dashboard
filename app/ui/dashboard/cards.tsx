import {
  BanknotesIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import DateRangeSelector from '@/app/ui/dashboard/date-range-selector';

const iconMap = {
  income: BanknotesIcon,
  cost: BanknotesIcon,
  members: UserGroupIcon,
  transactions: InboxIcon,
};

interface CardWrapperProps {
  startDate?: string;
  endDate?: string;
}

export default async function CardWrapper({ startDate, endDate }: CardWrapperProps) {
  const {
    numberOfMembers,
    numberOfTransactions,
    totalIncome,
    totalCost,
  } = await fetchCardData(startDate, endDate);
  
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total Income" value={totalIncome} type="income" />
        <Card title="Total Cost" value={totalCost} type="cost" />
        <Card title="Total Transactions" value={numberOfTransactions} type="transactions" />
        <Card title="Total Members" value={numberOfMembers} type="members"/>
      </div>
    </div>
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
