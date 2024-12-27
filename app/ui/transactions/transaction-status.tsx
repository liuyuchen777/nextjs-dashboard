import { CheckIcon } from "@heroicons/react/24/outline";
import { NoSymbolIcon } from "@heroicons/react/24/outline";

export default function TransactionStatus({ status }: { status: string }) {
  return (
    <fieldset>
        <legend className="mb-2 block text-sm font-medium">
          Set the transaction status
        </legend>
        <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                id="cost"
                name="status"
                type="radio"
                value="cost"
                defaultChecked={status === 'cost'}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                required
              />
              <label
                htmlFor="cost"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-300 px-3 py-1.5 text-xs font-medium text-gray-600"
              >
                Cost <NoSymbolIcon className="h-4 w-4" />
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="income"
                name="status"
                type="radio"
                value="income"
                defaultChecked={status === 'income'}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                required
              />
              <label
                htmlFor="income"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-300 px-3 py-1.5 text-xs font-medium text-white"
              >
                Income <CheckIcon className="h-4 w-4" />
              </label>
            </div>
          </div>
        </div>
      </fieldset>
  )
}