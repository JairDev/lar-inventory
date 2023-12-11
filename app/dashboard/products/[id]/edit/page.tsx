import { fetchProductById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/products/breadcrumbs";
import Form from "@/app/ui/products/edit-form";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);
  const product = await fetchProductById(id);
  console.log(product);
  if (!product) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Editar producto",
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form product={product} />
    </main>
  );
}
