'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { AccountantBook } from './definitions';

const FormSchema = z.object({
  id: z.string(),
  member_id: z.string({
    invalid_type_error: 'Please select a member.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than ¥0.' }),
  status: z.enum(['income', 'cost'], {
    invalid_type_error: 'Please select a transaction status.',
  }),
  date: z.string(),
  accountant_book: z.enum(Object.values(AccountantBook) as [string, ...string[]]),
  class: z.string().nullable(),
  sub_class: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
});

const UpdateTransaction = FormSchema.omit({ id: true });
const CreateTransaction = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    member_id?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createTransaction(prevState: State, formData: FormData) {
  const validatedFields = CreateTransaction.safeParse({
    member_id: formData.get('memberId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    accountant_book: formData.get('accountantBook'),
    class: formData.get('class'),
    sub_class: formData.get('subClass'),
    title: formData.get('title'),
    description: formData.get('description'),
    date: formData.get('datetime'),
  });

  if (!validatedFields.success) {
    const validateError = validatedFields.error.flatten().fieldErrors;
    console.log(validateError);
    return {
      errors: validateError,
      message: 'Missing Fields. Failed to Update Transaction.',
    };
  }

  try {
    await sql`
        INSERT INTO transactions (member_id, amount, status, date, accountant_book, class, sub_class, title, description)
        VALUES (
          ${validatedFields.data.member_id}, 
          ${validatedFields.data.amount}, 
          ${validatedFields.data.status}, 
          ${validatedFields.data.date}, 
          ${validatedFields.data.accountant_book}, 
          ${validatedFields.data.class}, 
          ${validatedFields.data.sub_class}, 
          ${validatedFields.data.title}, 
          ${validatedFields.data.description}
        )
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Transaction.',
    };
  }

  revalidatePath('/dashboard/transactions');
  redirect('/dashboard/transactions');
}

export async function updateTransaction(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateTransaction.safeParse({
    member_id: formData.get('memberId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    accountant_book: formData.get('accountantBook'),
    class: formData.get('class'),
    sub_class: formData.get('subClass'),
    title: formData.get('title'),
    description: formData.get('description'),
    date: formData.get('datetime'),
  });

  if (!validatedFields.success) {
    const validateError = validatedFields.error.flatten().fieldErrors;
    console.log(validateError);
    return {
      errors: validateError,
      message: 'Missing Fields. Failed to Update Transaction.',
    };
  }

  try {
    await sql`
      UPDATE transactions
      SET 
        member_id = ${validatedFields.data.member_id}, 
        amount = ${validatedFields.data.amount}, 
        status = ${validatedFields.data.status}, 
        accountant_book = ${validatedFields.data.accountant_book}, 
        class = ${validatedFields.data.class}, 
        sub_class = ${validatedFields.data.sub_class}, 
        title = ${validatedFields.data.title}, 
        description = ${validatedFields.data.description},
        date = ${validatedFields.data.date}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Transaction.' };
  }

  revalidatePath('/dashboard/transactions');
  redirect('/dashboard/transactions');
}

export async function deleteTransaction(id: string) {
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
