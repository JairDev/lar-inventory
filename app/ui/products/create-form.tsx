"use client";

import Link from "next/link";
import { Button } from "../button";
import { useFormState } from "react-dom";
import { createProduct } from "@/app/lib/actions";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);
  // console.log(state);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div>Nuevo producto</div>
        <div className="mt-4 mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre del producto"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
            </div>
            {state.errors?.name ? (
              <div
                id="name-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.name.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="buy_price_dollar"
            className="mb-2 block text-sm font-medium"
          >
            Precio de compra
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="buy_price_dollar"
                name="buy_price_dollar"
                type="number"
                step="0.01"
                placeholder="Precio de compra"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="buy_price_dollar-error"
              />
            </div>
            {state.errors?.buy_price_dollar ? (
              <div
                id="buy_price_dollar-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.buy_price_dollar.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            Cantidad
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="quantity"
                name="quantity"
                type="number"
                step="0.01"
                placeholder="Cantidad"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="quantity-error"
              />
            </div>
            {state.errors?.quantity ? (
              <div
                id="amount-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.quantity.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="revenue" className="mb-2 block text-sm font-medium">
            Ganancia %
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="revenue"
                name="revenue"
                type="number"
                step="0.01"
                placeholder="Ganancia"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="revenue-error"
              />
            </div>
            {state.errors?.revenue ? (
              <div
                id="amount-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.revenue.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Añadir producto</Button>
      </div>
    </form>
  );
}
