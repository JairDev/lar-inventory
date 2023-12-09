import { lusitana } from "@/app/ui/fonts";
import { fetchProductsPages } from "@/app/lib/data";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/invoices/pagination";
import { CreateProduct } from "@/app/ui/invoices/buttons";

import ProductsTable from "@/app/ui/products/table";
import DollarPrice from "@/app/ui/dollarPrice";

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
  const totalPages = await fetchProductsPages(query);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className=" flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar productos..." />
        <DollarPrice />
        {/* <div className="flex items-center gap-4">
          <div>$ 38000</div>
          <div className="mt-3 md:mt-0">
            <div className="inline-block border border-gray-200 px-4 py-2 text-green-950 duration-150 font-medium  rounded-lg hover:bg-green-100 active:bg-indigo-700 md:text-sm">
              Actualizar dólar
            </div>
          </div>
        </div> */}
      </div>
      <div className="mt-14 items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Productos
          </h3>
        </div>
        <CreateProduct />
      </div>
      <div className="mt-12 relative h-max overflow-auto">
        <ProductsTable query={query} currentPage={currentPage} />
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
