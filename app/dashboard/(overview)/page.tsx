import Cards, { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from "@/app/lib/data";
import { Suspense } from "react";
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "@/app/ui/skeletons";

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

export default async function Page() {
  // const revenue = await fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
        <Suspense fallback={<CardsSkeleton />}>
          <Cards />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue} /> */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
