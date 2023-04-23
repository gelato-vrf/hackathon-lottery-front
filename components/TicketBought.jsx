import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const TicketBought = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 relative p-10 ">
      <div className="flex flex-row items-start justify-center gap-2 ">
        <h1 className="text-4xl text-black ">Ticket Bought!</h1>
        <BsFillCheckCircleFill className="text-green-500 w-9 h-9" />
      </div>
      <p className="text-center">
        You will be able to close the lottery when the countdown ends.
      </p>
    </div>
  );
};

export default TicketBought;
