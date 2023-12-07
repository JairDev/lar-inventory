import Cards, { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
  fetchFilteredProducts,
} from "@/app/lib/data";
import { Suspense } from "react";
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "@/app/ui/skeletons";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/invoices/pagination";
import { CreateProduct, UpdateProduct } from "@/app/ui/invoices/buttons";

// ¿Qué es el renderizado estático?
// Con la representación estática, la obtención y representación de datos se produce
// en el servidor en el momento de la compilación (cuando se implementa) o durante la revalidación.
// A continuación, el resultado se puede distribuir y almacenar en caché (almacenar) en un archivo
// Red de entrega de contenido (CDN).

// ¿Qué es el renderizado dinámico?
// Con la representación dinámica, el contenido se representa en el servidor para cada usuario
// en el momento de la solicitud (cuando el usuario visita la página). Hay un par de beneficios de
// la representación dinámica:

// Datos en tiempo real: la representación dinámica permite que la aplicación muestre datos en tiempo real
// o actualizados con frecuencia. Esto es ideal para aplicaciones en las que los datos cambian
// con frecuencia.
// Contenido específico del usuario: es más fácil ofrecer contenido específico del usuario,
// como paneles personalizados o perfiles de usuario, a través de la representación dinámica,
// ya que los datos se actualizan en función de la interacción del usuario.
// Información de la hora de la solicitud: la representación dinámica le permite acceder
// a información que solo se puede conocer en el momento de la solicitud, como las cookies
// o los parámetros de búsqueda de la URL.

// export default async function Page() {
//   // const revenue = await fetchRevenue();
//   // const latestInvoices = await fetchLatestInvoices();
//   const {
//     numberOfInvoices,
//     numberOfCustomers,
//     totalPaidInvoices,
//     totalPendingInvoices,
//   } = await fetchCardData();
//   return (
//     <main>
//       <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
//         Dashboard
//       </h1>
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
//         <Card title="Pending" value={totalPendingInvoices} type="pending" />
//         <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
//         <Card
//           title="Total Customers"
//           value={numberOfCustomers}
//           type="customers"
//         /> */}
//         <Suspense fallback={<CardsSkeleton />}>
//           <Cards />
//         </Suspense>
//       </div>
//       <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
//         {/* <RevenueChart revenue={revenue} /> */}
//         <Suspense fallback={<RevenueChartSkeleton />}>
//           <RevenueChart />
//         </Suspense>
//         {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
//         <Suspense fallback={<LatestInvoicesSkeleton />}>
//           <LatestInvoices />
//         </Suspense>
//       </div>
//     </main>
//   );
// }

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const products = await fetchFilteredProducts(query);
  console.log(products);
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className=" flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar productos..." />
        <div className="flex items-center gap-4">
          <div>$ 38000</div>
          <div className="mt-3 md:mt-0">
            <a
              href=""
              className="inline-block border border-gray-200 px-4 py-2 text-indigo-500 duration-150 font-medium  rounded-lg hover:bg-gray-300 active:bg-indigo-700 md:text-sm"
            >
              Actualizar dólar
            </a>
          </div>
        </div>
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
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 pr-6">Nombre / Bulto</th>
              <th className="py-3 pr-6">P / Compra $</th>
              <th className="py-3 pr-6">P / Compra Bs</th>
              <th className="py-3 pr-6">Cantidad</th>
              <th className="py-3 pr-6">PVP</th>
              <th className="py-3 pr-6">% Ganancia</th>
              <th className="py-3 pr-6">Precio de venta</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {products.map((item, idx) => (
              <tr key={idx}>
                <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {item.buy_price_dollar}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {item.buy_price_dollar * 38000}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {(item.buy_price_dollar * 38000) / item.quantity}
                </td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.revenue}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {((item.buy_price_dollar * 38000) / item.quantity) * 0.2}
                </td>
                <td className="text-right px-6 whitespace-nowrap">
                  <UpdateProduct id={item.id} />
                  <button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={5} />
      </div>
    </div>
  );
}
