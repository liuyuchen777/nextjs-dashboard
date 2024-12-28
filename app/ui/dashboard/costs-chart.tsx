'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { lusitana } from '@/app/ui/fonts';

export default function CostsChart({ data }: { data: { date: string; total_cost: number }[] }) {
  const formattedData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    total: item.total_cost
  }));

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Daily Costs - Last 14 Days
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={formattedData}>
            <XAxis 
              dataKey="date" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `¥${value}`}
            />
            <Tooltip />
            <Bar
              dataKey="total"
              fill="#0EA5E9"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 