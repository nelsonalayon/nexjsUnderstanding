'use server'

// these are server actions that can be used in client components. They handle form submissions for creating and updating invoices, interacting with a PostgreSQL database, and then revalidating the relevant paths and redirecting the user to the invoices dashboard.

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Customer is required',
    }),
    amount: z.coerce.number().gt(0, { message: 'Amount must be greater than 0' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Status is required',
    }),
    date: z.string()
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message: string | null;
    values?: {
        customerId?: string;
        amount?: string;
        status?: string;
    };
    submissionId?: number;
};

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials';
                default:
                    return 'An unexpected error occurred. Please try again.';
            }
        }
        throw error;
    }
}

export async function createInvoice(prevState: State, formData: FormData) {
    const validateFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validateFields.success) {       
        return {
           errors: validateFields.error.flatten().fieldErrors,
           message: 'Please correct the errors below and resubmit the form.',
           values: {
               customerId: formData.get('customerId') as string || '',
               amount: formData.get('amount') as string || '',
               status: formData.get('status') as string || '',
           },
           submissionId: Date.now(),
        };
    }
    
    const { customerId, amount, status } = validateFields.data;
    const amountInCents = Math.round(amount * 100);
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    }
    catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}


const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = Math.round(amount * 100);

    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
    `;
    }
    catch (error) {
        console.error('Error updating invoice:', error);
        throw error;
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`
        DELETE FROM invoices
        WHERE id = ${id}
    `;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}