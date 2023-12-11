import { fetchDollarPrice, fetchFilteredProducts } from "@/app/lib/data";
import {
  formatCurrency,
  getBsPrice,
  getDollarPrice,
  getPvpPrice,
  getSellPrice,
} from "@/app/lib/utils";
import { DeleteProduct, UpdateProduct } from "./buttons";

export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const dollarPrice = await fetchDollarPrice();
  const products = await fetchFilteredProducts(query, currentPage);
  return (
    <table className="w-full table-auto text-sm text-left">
      <thead className="text-gray-600 font-medium border-b">
        <tr>
          <th className="py-3 pr-6">Nombre / Bulto</th>
          <th className="py-3 pr-6">P / Venta Bs</th>
          <th className="py-3 pr-6">P / Venta $</th>
          <th className="py-3 pr-6">P / Compra $</th>
          <th className="py-3 pr-6">P / Compra Bs</th>
          <th className="py-3 pr-6">Cantidad</th>
          <th className="py-3 pr-6">PVP</th>
          <th className="py-3 pr-6">% Ganancia</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 divide-y">
        {products.map((item, idx) => (
          <tr key={idx}>
            <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
            <td className="pr-6 py-4 whitespace-nowrap">
              {formatCurrency(
                getSellPrice(
                  item.buy_price_dollar,
                  dollarPrice?.current_price,
                  item.quantity,
                  item.revenue
                )
              )}
            </td>
            <td>
              {getDollarPrice(
                getSellPrice(
                  item.buy_price_dollar,
                  dollarPrice?.current_price,
                  item.quantity,
                  item.revenue
                ),
                dollarPrice?.current_price
              )}
            </td>
            <td className="pr-6 py-4 whitespace-nowrap">
              {item.buy_price_dollar}
            </td>
            <td className="pr-6 py-4 whitespace-nowrap">
              {getBsPrice(item.buy_price_dollar, dollarPrice?.current_price)}
            </td>
            <td className="pr-6 py-4 whitespace-nowrap">{item.quantity}</td>
            <td className="pr-6 py-4 whitespace-nowrap">
              {getPvpPrice(
                item.buy_price_dollar,
                dollarPrice?.current_price,
                item.quantity
              )}
            </td>
            <td className="pr-6 py-4 whitespace-nowrap">{item.revenue}</td>
            <td className="px-6 py-4  flex gap-2">
              <UpdateProduct id={item.id} />
              <DeleteProduct id={item.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
