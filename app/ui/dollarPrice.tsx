import { fetchDollarPrice } from "../lib/data";
import DollarForm from "./dollar-form";

export default async function DollarPrice() {
  const dollarPrice = await fetchDollarPrice();
  // console.log(dollarPrice);
  return (
    <div className="flex items-center gap-4">
      <div>$ {dollarPrice?.current_price}</div>
      <div className="mt-3 md:mt-0 relative">
        <div className="inline-block border border-gray-200 px-4 py-2 text-green-950 duration-150 font-medium   rounded-lg hover:bg-green-100 active:bg-indigo-700 md:text-sm">
          Actualizar dólar
        </div>

        <div className="border border-gray-200 absolute top-14 right-0 bg-white p-4 ">
          <DollarForm dollar={dollarPrice} />
        </div>
      </div>
    </div>
  );
}
