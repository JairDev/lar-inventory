import { sql } from "@vercel/postgres";
import { User, ProductsTable, ProductForm, DollarForm } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

// Puede usar una API Next.js llamada dentro de los componentes del servidor o funciones de
// obtención de datos para excluirse de la representación estática. Agreguemos esto.unstable_noStore

// Nota: es una API experimental y puede cambiar en el futuro. Si prefiere utilizar una API
// estable en sus propios proyectos, también puede utilizar la opción Configuración de
// segmento .unstable_noStoreexport const dynamic = "force-dynamic"

const ITEMS_PER_PAGE = 10;

export async function fetchDollarPrice() {
  noStore();
  try {
    const data = await sql<DollarForm>`
      SELECT 
        dollar.id,
        dollar.current_price
      FROM dollar
    `;
    // console.log(data.rows[0]);
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch dollar price.");
  }
}

export async function fetchFilteredProducts(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const products = await sql<ProductsTable>`
    SELECT 
    *
    FROM products
    WHERE
    products.name ILIKE ${`%${query}%`} 
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
   
    `;
    // console.log(products.rows);
    return products.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchProductById(id: string) {
  noStore();
  try {
    const data = await sql<ProductForm>`
      SELECT
        products.id,
        products.name,
        products.buy_price_dollar,
        products.quantity,
        products.revenue
      FROM products
      WHERE products.id = ${id};
    `;

    // const invoice = data.rows.map((invoice) => ({
    //   ...invoice,
    //   // Convert amount from cents to dollars
    //   amount: invoice.amount / 100,
    // }));
    console.log(data);
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchProductsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM products
    WHERE
    products.name ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * from USERS where email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
