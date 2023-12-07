import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoices",
};

// ¿Cuándo usar el gancho useSearchParams() frente a la propiedad searchParams?

// Es posible que haya notado que usó dos formas diferentes de extraer parámetros de búsqueda.
// El uso de uno u otro depende de si se trabaja en el cliente o en el servidor.

// <Search> es un componente de cliente, por lo que utilizó el gancho para acceder a los parámetros
//   desde el cliente.useSearchParams()

// <Table> es un componente de servidor que obtiene sus propios datos, por lo que puede pasar la
//   propiedad de la página al componente.searchParams

// Como regla general, si desea leer los parámetros del cliente, use el gancho, ya que esto evita
// tener que volver al servidor.useSearchParams()

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  // console.log(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
