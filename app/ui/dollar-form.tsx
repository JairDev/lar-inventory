"use client";

import { useFormState } from "react-dom";
import { updateDollarPrice } from "../lib/actions";
import { DollarForm } from "../lib/definitions";
import { Button } from "./button";
import { useRef } from "react";

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
  const contentFormRef = useRef(null);
  // console.log("state", state);
  const handleVisibility = (e) => {
    // console.log(e.target);
    contentFormRef.current.classList.toggle("hidden");
  };

  const handleClose = (e) => {
    // console.log(e.target);
    contentFormRef.current.classList.add("hidden");
  };
  return (
    <div className="mt-3 md:mt-0 relative">
      <div
        onClick={handleVisibility}
        className="inline-block border border-gray-200 cursor-pointer px-4 py-2 text-green-950 duration-150 font-medium   rounded-lg hover:bg-green-100 active:bg-indigo-700 md:text-sm"
      >
        Actualizar dólar
      </div>

      <div
        ref={contentFormRef}
        className="border border-gray-200 absolute top-14 right-0 bg-white p-4 z-30 hidden"
      >
        <form action={dispatch}>
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-full mb-2">
              <div>
                <span className="mr-1">$</span>
                <label htmlFor="current_price">Nuevo Precio</label>
              </div>
              <div onClick={handleClose} className="cursor-pointer">
                X
              </div>
            </div>
            <input
              id="current_price"
              name="current_price"
              type="number"
              className="w-full rounded-lg border border-gray-200 "
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
      </div>
    </div>
  );
}
