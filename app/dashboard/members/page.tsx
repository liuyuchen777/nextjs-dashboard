import { Metadata } from 'next';
import MembersTable from "@/app/ui/members/table";
import { fetchFilteredMembers } from "@/app/lib/data";

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const members = await fetchFilteredMembers(query);

  return (
    <div className="w-full">
      <MembersTable members={members}/>
    </div>
  );
}
