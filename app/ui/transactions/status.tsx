import { CheckIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TransactionStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      {status === 'cost' ? (
        <>
          Cost <NoSymbolIcon className="ml-1 w-4 text-red-500" />
        </>
      ) : null}
      {status === 'income' ? (
        <>
          Income <CheckIcon className="h-4 w-4 text-green-500" />
        </>
      ) : null}
    </span>
  );
}
