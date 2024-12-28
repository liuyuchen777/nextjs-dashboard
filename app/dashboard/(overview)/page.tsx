import CardWrapper from '@/app/ui/dashboard/cards';
import LatestTransactions from '@/app/ui/dashboard/latest-transactions';
import CostsChartWrapper from '@/app/ui/dashboard/costs-chart-wrapper';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  LatestTransactionsSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import { Metadata } from 'next';
import DateRangeSelector from '@/app/ui/dashboard/date-range-selector';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Page({ searchParams }: { searchParams?: { startDate?: string, endDate?: string } }) {
  const startDate = searchParams?.startDate || '';
  const endDate = searchParams?.endDate || '';

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <DateRangeSelector />
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper startDate={startDate} endDate={endDate} />
      </Suspense>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<LatestTransactionsSkeleton />}>
          <LatestTransactions />
        </Suspense>
        <Suspense fallback={<div className="md:col-span-4 h-[400px] skeleton-box" />}>
          <CostsChartWrapper />
        </Suspense>
      </div>
    </main>
  );
}
