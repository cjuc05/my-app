import { Client } from "pg";

const connectionString = "postgres://postgres:Test123!@localhost:5432/customer_db";
const client = new Client({ connectionString });


client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));

export async function GET(request: Request) {
  return new Response('Hello from the API!');
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validation (add more checks as needed)
    if (!data.full_name || !data.address || !data.mobile_phone) {
      return new Response('Missing required fields', { status: 400 });
    }
    if (typeof data.full_name !== 'string' || typeof data.address !== 'string' || typeof data.mobile_phone !== 'string') {
      return new Response('Invalid data types', { status: 400 });
    }
    if (!/^\d+$/.test(data.mobile_phone)) {
      return new Response('Invalid mobile phone number', { status: 400 });
    }

    const insertResult = await client.query(
      'INSERT INTO customers (full_name, address, mobile_phone) VALUES ($1, $2, $3)',
      [data.full_name, data.address, data.mobile_phone]
    );

    if (insertResult.rowCount === 1) {
      return new Response('Customer added successfully', { status: 201 });
    } else {
      return new Response('Error adding customer', { status: 500 });
    }
  } catch (error) {
    console.error('Error inserting data:', error);
    return new Response('Error adding customer', { status: 500 });
  }
}