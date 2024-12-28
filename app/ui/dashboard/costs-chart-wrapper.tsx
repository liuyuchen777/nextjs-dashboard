import { fetchLast14DaysCosts } from '@/app/lib/data';
import CostsChart from './costs-chart';

export default async function CostsChartWrapper() {
  const costs = await fetchLast14DaysCosts();
  return <CostsChart data={costs} />;
} 
