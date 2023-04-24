import React, { useState } from "react";
import { ImTicket } from "react-icons/im";
import { buyTicket } from "../lib/functionsFromContract";
import Loading from "./Loading";

const AMOUNT_TICKET = "0.01";

const BuyTicket = ({ setTicketBought }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyTicket = async () => {
    setIsLoading(true);
    try {
      const result = await buyTicket(AMOUNT_TICKET);
      if (result === true) {
        setTicketBought(true);
      }
    } catch {
      (error) => {
        console.error(error);
      };
    }
    setIsLoading(false);
  };
  return (
    <div className="w-full flex flex-col items-center justify-around gap-10 relative p-10">
      <h1 className="text-4xl text-black">Buy a Ticket</h1>
      <p>
        Only ONE ticket can be purchased per address, if you buy more the winner
        is selected randomly through the use of DRAND and Gelato Web3 functions.
      </p>
      <div className="rounded-lg bg-black/30 text-white flex flex-row justify-center gap-10 px-8 py-2">
        <div className="flex flex-row items-center gap-2 justify-center">
          <p className="text-black text-lg font-medium">1x</p>
          <ImTicket className="w-6 h-6 text-blue-600" />
        </div>
        <p className="font-semibold text-xl">0.01 ETH</p>
      </div>
      <button
        type="button"
        onClick={handleBuyTicket}
        className="rounded-2xl bg-blue-500 text-white text-lg px-8 py-3 hover:scale-105 duration-100"
      >
        Buy
      </button>
      {isLoading ? <Loading /> : null}
    </div>
  );
};

export default BuyTicket;
