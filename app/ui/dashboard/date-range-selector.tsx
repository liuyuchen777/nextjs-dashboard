'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function DateRangeSelector() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');

  const handleChange = useDebouncedCallback(() => {
    if (startDate && endDate) {
      const params = new URLSearchParams(searchParams);
      params.set('startDate', startDate);
      params.set('endDate', endDate);

      replace(`?${params.toString()}`);
    }
  }, 300);

  const setDateRange = (start: Date, end: Date) => {
    const formattedStart = start.toISOString().split('T')[0];
    const formattedEnd = end.toISOString().split('T')[0];
    setStartDate(formattedStart);
    setEndDate(formattedEnd);
    setTimeout(handleChange, 0);
  };

  const getPresetRanges = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    
    const firstDayTwoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const lastDayTwoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 1, 0);

    const firstDayThreeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 1);
    const lastDayThreeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 0);

    const firstDayFourMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 4, 1);
    const lastDayFourMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 0);

    return [
      {
        label: 'This Month',
        range: [firstDayOfMonth, lastDayOfMonth],
      },
      {
        label: 'Last Month',
        range: [firstDayLastMonth, lastDayLastMonth],
      },
      {
        label: 'Two Months Ago',
        range: [firstDayTwoMonthsAgo, lastDayTwoMonthsAgo],
      },
      {
        label: 'Three Months Ago',
        range: [firstDayThreeMonthsAgo, lastDayThreeMonthsAgo],
      },
      {
        label: 'Four Months Ago',
        range: [firstDayFourMonthsAgo, lastDayFourMonthsAgo],
      },
    ];
  };

  return (
    <div className="mb-4 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="start-date">From:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            if (endDate) handleChange();
          }}
          className="rounded-md border px-2 py-1"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="end-date">To:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            if (startDate) handleChange();
          }}
          className="rounded-md border px-2 py-1"
        />
      </div>
      <div className="flex gap-2">
        {getPresetRanges().map((preset) => (
          <button
            key={preset.label}
            onClick={() => setDateRange(preset.range[0], preset.range[1])}
            className="rounded-md bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
