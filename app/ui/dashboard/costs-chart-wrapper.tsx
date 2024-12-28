import { fetchLast14DaysCosts } from '@/app/lib/data';
import CostsChart from './costs-chart';

export default async function CostsChartWrapper({ accountantBook }: { accountantBook: string }) {
  const costs = await fetchLast14DaysCosts(accountantBook);
  return <CostsChart data={costs} />;
} 
