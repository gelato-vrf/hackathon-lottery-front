import React, { useState } from "react";
import HeroCard from "./HeroCard";
import BuyTicket from "./BuyTicket";
import TicketBought from "./TicketBought";

const Card = ({ account, buy, setBuy }) => {
  const [ticketBought, setTicketBought] = useState(false);
  return (
    <div className="w-[500px] rounded-[1.3rem] gold-gradient z-10 backdrop-blur-xl overflow-hidden">
      {account.isConnected && buy ? (
        ticketBought ? (
          <TicketBought />
        ) : (
          <BuyTicket setTicketBought={setTicketBought} />
        )
      ) : (
        <HeroCard account={account} buy={buy} setBuy={setBuy} />
      )}
    </div>
  );
};

export default Card;
