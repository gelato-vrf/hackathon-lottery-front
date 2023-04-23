import React, { useState } from "react";
import StartLottery from "./StartLottery";
import BuyTicket from "./BuyTicket";
import TicketBought from "./TicketBought";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Winner from "./Winner";

const Card = ({
  ticketBought,
  setTicketBought,
  lotteryStarted,
  setLotteryStarted,
  winner,
}) => {
  const { address, isConnected } = useAccount();
  return (
    <div className="w-full max-w-[500px] rounded-[1.3rem] gold-gradient z-10 backdrop-blur-xl overflow-hidden">
      {isConnected && lotteryStarted ? (
        winner ? (
          <Winner />
        ) : ticketBought ? (
          <TicketBought />
        ) : (
          <BuyTicket setTicketBought={setTicketBought} />
        )
      ) : (
        <StartLottery
          isConnected={isConnected}
          setLotteryStarted={setLotteryStarted}
        />
      )}
    </div>
  );
};

export default Card;
