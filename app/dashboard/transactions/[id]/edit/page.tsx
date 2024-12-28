import Form from '@/app/ui/transactions/form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { fetchTransactionById, fetchMembers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Transactions',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [transaction, members] = await Promise.all([
    fetchTransactionById(id),
    fetchMembers(),
  ]);
  if (!transaction) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transactions', href: '/dashboard/transactions' },
          {
            label: 'Edit Transaction',
            href: `/dashboard/transactions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form transaction={transaction} members={members} />
    </main>
  );
}
