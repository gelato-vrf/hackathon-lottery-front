import React from "react";
import HeroCard from "./HeroCard";
import BuyTicket from "./BuyTicket";

const Card = ({ account, buy, setBuy }) => {
  return (
    <div className="w-[500px] rounded-[1.3rem] gold-gradient  p-10 z-10 backdrop-blur-xl overflow-hidden">
      {account.isConnected && buy ? (
        <BuyTicket />
      ) : (
        <HeroCard account={account} buy={buy} setBuy={setBuy} />
      )}
    </div>
  );
};

export default Card;
