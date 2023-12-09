import { fetchDollarPrice } from "../lib/data";
import DollarForm from "./dollar-form";

export default async function DollarPrice() {
  const dollarPrice = await fetchDollarPrice();
  // console.log(dollarPrice);
  return (
    <div className="flex items-center gap-4">
      <div>$ {dollarPrice?.current_price}</div>

      <DollarForm dollar={dollarPrice} />
    </div>
  );
}
