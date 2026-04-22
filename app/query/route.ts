import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
console.log('Connected to PostgreSQL database');

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id   
  `;

	return data;
}

export async function GET() { 
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
