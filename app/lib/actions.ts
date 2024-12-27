'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  memberId: z.string({
    invalid_type_error: 'Please select a member.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['income', 'cost'], {
    invalid_type_error: 'Please select a transaction status.',
  }),
  date: z.string(),
});

const UpdateTransaction = FormSchema.omit({ id: true, date: true });
const CreateTransaction = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateTransaction.safeParse({
    memberId: formData.get('memberId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { memberId, amount, status } = CreateTransaction.parse({
    memberId: formData.get('memberId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
        INSERT INTO transactions (member_id, amount, status, date)
        VALUES (${memberId}, ${amountInCents}, ${status}, ${date})
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/transactions');
  redirect('/dashboard/transactions');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateTransaction.safeParse({
    memberId: formData.get('memberId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { memberId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE transactions
      SET member_id = ${memberId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/transactions');
  redirect('/dashboard/transactions');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM transactions WHERE id = ${id}`;
    revalidatePath('/dashboard/transactions');
    return { message: 'Deleted Transaction.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Transaction.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
