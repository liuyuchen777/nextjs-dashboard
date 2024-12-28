'use client';

import { AccountantBook } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AccountantBookSelector() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [accountantBook, setAccountantBook] = useState(
    searchParams.get('accountantBook') || AccountantBook.familyAccountantBook
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setAccountantBook(newValue);
    
    const params = new URLSearchParams(searchParams);
    params.set('accountantBook', newValue);
    replace(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center">
      <select
        className="rounded-md border border-gray-200 py-2 px-3 min-w-[200px]"
        value={accountantBook}
        onChange={handleChange}
      >
        {Object.values(AccountantBook).map((book) => (
          <option key={book} value={book}>
            {book}
          </option>
        ))}
      </select>
    </div>
  );
}