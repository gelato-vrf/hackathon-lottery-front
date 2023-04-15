import React from "react";
import { ImTicket } from "react-icons/im";

const AMOUNT_TICKET = 10;

const BuyTicket = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl text-black">Buy a ticket</h1>
      <div className="flex flex-col items-end gap-2  select-none">
        <div className="flex flex-row items-center justify-center gap-10 rounded-lg bg-black/40  text-white p-2 px-6">
          <p className="text-lg">Tickets </p>
          <div className="flex flex-row gap-2 items-center">
            <p className="bg-black/30 p-1 px-2 rounded-lg">x1</p>
            <ImTicket className="w-6 h-6" />
          </div>
          <p className="text-lg font-semibold">{AMOUNT_TICKET} ETH</p>
        </div>
        <div className="rounded-lg bg-black/0 font-bold text-lg text-black flex flex-row justify-end gap-2 px-6 p-2">
          <span className="font-semibold">Total:</span>
          <span>{AMOUNT_TICKET} ETH</span>
        </div>
      </div>
      <button
        type="button"
        className="rounded-2xl bg-blue-500 text-white text-lg px-8 py-3 hover:scale-105 duration-100"
      >
        Buy
      </button>
    </div>
  );
};

export default BuyTicket;
