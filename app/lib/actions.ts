"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  buy_price_dollar: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  quantity: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  revenue: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
});

const DollarSchema = z.object({
  id: z.string(),
  current_price: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceSchema.omit({ date: true });
const CreateProduct = ProductSchema.omit({ id: true });
const UpdateDollar = DollarSchema.omit({ id: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type StateProduct = {
  errors?: {
    name?: string[];
    buy_price_dollar?: string[];
    quantity?: string[];
    revenue?: string[];
  };
  message?: string | null;
};

export type StateDollarPrice = {
  errors?: {
    current_price?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function createProduct(
  prevState: StateProduct,
  formData: FormData
) {
  const validatedFields = CreateProduct.safeParse({
    name: formData.get("name"),
    buy_price_dollar: formData.get("buy_price_dollar"),
    quantity: formData.get("quantity"),
    revenue: formData.get("revenue"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }
  const { name, buy_price_dollar, quantity, revenue } = validatedFields.data;
  console.log(name, buy_price_dollar, quantity, revenue);
  try {
    await sql`
      INSERT INTO products (name, buy_price_dollar, quantity, revenue)
      VALUES (${name}, ${buy_price_dollar}, ${quantity}, ${revenue})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateDollarPrice(
  id: string,
  prevState: StateDollarPrice,
  formData: FormData
) {
  console.log(id);
  const validatedFields = UpdateDollar.safeParse({
    current_price: formData.get("current_price"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update price.",
    };
  }
  const { current_price } = validatedFields.data;
  console.log(id);
  try {
    await sql`
      UPDATE dollar
      SET current_price = ${current_price}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update dollar price." };
  }

  revalidatePath("/dashboard");
}

export async function updateProduct(
  id: string,
  prevState: StateProduct,
  formData: FormData
) {
  const validatedFields = CreateProduct.safeParse({
    name: formData.get("name"),
    buy_price_dollar: formData.get("buy_price_dollar"),
    quantity: formData.get("quantity"),
    revenue: formData.get("revenue"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Edit Product.",
    };
  }
  const { name, buy_price_dollar, quantity, revenue } = validatedFields.data;
  try {
    await sql`
      UPDATE products
      SET name = ${name}, buy_price_dollar = ${buy_price_dollar}, quantity = ${quantity},  revenue = ${revenue} 
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Product." };
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteProduct(id: string) {
  // throw new Error("Failed to Delete Invoice");
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    revalidatePath("/dashboard");
    return { message: "Deleted Product." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Product." };
  }
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Edit Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  throw new Error("Failed to Delete Invoice");
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
