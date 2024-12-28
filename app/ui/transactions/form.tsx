'use client';

import { MemberField, TransactionForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CurrencyYenIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, updateTransaction } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import TransactionStatus from './transaction-status';

export default function Form({ 
  members,
  transaction,
}: { 
  members: MemberField[];
  transaction?: TransactionForm;
}) {
  const initialState = { message: null, errors: {} };
  const isEditing = !!transaction;

  // Use different actions based on whether we're editing or creating
  const formAction = isEditing 
    ? updateTransaction.bind(null, transaction.id)
    : createInvoice;

  const [state, dispatch] = useFormState(formAction, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Member Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose member for transaction
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={transaction?.member_id || ""}
              required={!isEditing}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Transaction Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={transaction?.amount}
                placeholder="Enter JPY amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required={!isEditing}
              />
              <CurrencyYenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Transaction Status */}
        <TransactionStatus status={transaction?.status || "cost"} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/transactions"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">
          {isEditing ? 'Edit Transaction' : 'Create Transaction'}
        </Button>
      </div>
    </form>
  );
} 