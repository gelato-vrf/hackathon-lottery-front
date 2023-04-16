import React, { useState } from "react";
import { getWinner } from "../lib/functionsFromContract";

const TicketBought = () => {
  const [winner, setWinner] = useState("");
  const [random, setRandom] = useState(0);
  const handleCheckWinner = async () => {
    getWinner()
      .then((result) => {
        setWinner(result.winner);
        setRandom(result.rand);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 relative p-10 ">
      {winner ? (
        <h1 className="text-4xl text-black">The winner is</h1>
      ) : (
        <h1 className="text-4xl text-black">Ticket bought!</h1>
      )}
      <p id="winner" className="font-semibold px-4 py-2 bg-white rounded-lg">
        {winner}
      </p>
      {winner ? (
        <p className="">
          The random number is: <span className="">{random}</span>
        </p>
      ) : null}
      <button
        className="rounded-2xl border-4 border-blue-500 bg-transparent hover:bg-blue-500 text-blue-600 hover:text-white text-lg px-8 py-3 hover:scale-[1.02] duration-100"
        onClick={handleCheckWinner}
      >
        Check Winner
      </button>
    </div>
  );
};

export default TicketBought;
