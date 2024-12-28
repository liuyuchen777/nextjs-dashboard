'use client';

import { MemberField, TransactionForm, AccountantBook, classAndSubClassMap } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CurrencyYenIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createTransaction, updateTransaction } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import TransactionStatus from './transaction-status';
import { useState } from 'react';

export default function Form({ 
  members,
  transaction,
}: { 
  members: MemberField[];
  transaction?: TransactionForm;
}) {
  const initialState = { message: null, errors: {} };
  const isEditing = !!transaction;
  const [selectedClass, setSelectedClass] = useState(transaction?.class || '');

  const formAction = isEditing 
    ? updateTransaction.bind(null, transaction.id)
    : createTransaction;

  const [state, dispatch] = useFormState(formAction, initialState);

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {/* Member Name */}
        <div className="mb-4">
          <label htmlFor="memberId" className="mb-2 block text-sm font-medium">
            Choose member for transaction
          </label>
          <div className="relative">
            <select
              id="memberId"
              name="memberId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={transaction?.member_id || ""}
              required={!isEditing}
              aria-describedby="memberId-error"
            >
              <option value="" disabled>
                Select a member
              </option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="memberId-error" aria-live="polite" aria-atomic="true">
            {state.errors?.member_id &&
              state.errors.member_id.map((error: string) => (
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

        {/* Transaction Class and Sub-class */}
        <div className="mb-4">
          <label htmlFor="class" className="mb-2 block text-sm font-medium">
            Transaction Category
          </label>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <select
                id="class"
                name="class"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                value={selectedClass}
                onChange={handleClassChange}
                required={!isEditing}
              >
                <option value="" disabled>Select category</option>
                {Object.keys(classAndSubClassMap).map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative flex-1">
              <select
                id="subClass"
                name="subClass"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={transaction?.sub_class || ""}
                required={!isEditing}
              >
                <option value="" disabled>Select sub-category</option>
                {selectedClass && classAndSubClassMap[selectedClass]?.map((subClass) => (
                  <option key={subClass} value={subClass}>
                    {subClass}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Account Book */}
        <div className="mb-4">
          <label htmlFor="accountantBook" className="mb-2 block text-sm font-medium">
            Accountant Book
          </label>
          <div className="relative">
            <select
              id="accountantBook"
              name="accountantBook"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={transaction?.accountant_book || AccountantBook.familyAccountantBook}
              required={!isEditing}
            >
              <option value="" disabled>Select accountant book</option>
              {Object.values(AccountantBook).map((book) => (
                <option key={book} value={book}>
                  {book}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={transaction?.title}
              placeholder="Enter transaction title"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              required={!isEditing}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={transaction?.description}
              placeholder="Enter transaction description"
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            />
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
