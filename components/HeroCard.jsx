import React from "react";
import { GiTwoCoins } from "react-icons/gi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const HeroCard = ({ account, setBuy, buy }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 p-10">
      <h1 className="text-4xl text-black">Get your ticket NOW!</h1>
      <div className="flex flex-col items-center gap-1">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-lg font-semibold">POT</p>
          <GiTwoCoins className="w-6 h-6" />
        </div>
        <p className=" rounded-full p-2 px-6 text-2xl font-bold bg-black/40 text-white select-none">
          100 ETH
        </p>
      </div>
      <div className="">
        {account.isConnected ? (
          <button
            onClick={() => {
              setBuy(!buy);
              console.log("buy", buy);
            }}
            type="button"
            className="rounded-2xl bg-blue-500 text-white text-lg px-8 py-3 hover:scale-105 duration-100"
          >
            Buy ticket
          </button>
        ) : (
          <ConnectButton />
        )}
      </div>
    </div>
  );
};

export default HeroCard;
