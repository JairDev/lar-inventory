"use client";

import { useFormState } from "react-dom";
import { updateDollarPrice } from "../lib/actions";
import { DollarForm } from "../lib/definitions";
import { Button } from "./button";

// I was expecting (state: StateDollarPrice, payload: FormData) =>
// Promise<StateDollarPrice>, but you passed (prevState: StateDollarPrice, formData: FormData)
// => Promise<{ errors: { current_price?: string[] | undefined; }; message: string; } |
// { message: string; errors?: undefined; } | undefined>.

// export type StateDollarPrice = {
//   errors?: {
//     current_price?: string[];
//   };
//   message?: string | null;
// };

// (alias) useFormState<StateProduct, FormData>(action: (state: StateProduct, payload: FormData) =>
// Promise<StateProduct>, initialState: StateProduct, permalink?: string | undefined): [state: ...]
// (+1 overload)
// import useFormState

export default function DollarForm({ dollar }: { dollar: DollarForm }) {
  const initialState = { message: null, errors: {} };
  const updateDollarWithId = updateDollarPrice.bind(null, dollar.id);
  const [state, dispatch] = useFormState(updateDollarWithId, initialState);
  // console.log("state", state);
  return (
    <form action={dispatch}>
      <div className="flex items-center">
        $<label htmlFor="current_price">Nuevo Precio</label>
        <input
          id="current_price"
          name="current_price"
          type="number"
          className="w-full rounded-lg border border-gray-200 ml-4"
          placeholder="Nuevo precio"
          defaultValue={dollar.current_price}
          aria-describedby="current_price-error"
        />
      </div>
      {/* {state.errors?.current_price ? (
        <div
          id="current_price-error"
          aria-live="polite"
          className="mt-2 text-sm text-red-500"
        >
          {state.errors.current_price.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null} */}
      <div className="flex gap-4 mt-4">
        <button className="border border-gray-200 px-4 py-2 rounded-lg">
          Cancelar
        </button>
        <button type="submit" className="bg-green-600 px-4 py-2 rounded-lg">
          Actualizar
        </button>
      </div>
    </form>
  );
}
