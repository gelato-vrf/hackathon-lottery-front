import React, { useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { startLottery } from "../lib/functionsFromContract";
import Loading from "./Loading";

const StartLottery = ({ isConnected, setLotteryStarted }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartLottery = async () => {
    setIsLoading(true);
    await startLottery();
    setLotteryStarted(true);
    setIsLoading(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative gap-10 p-10">
      <h1 className="text-4xl text-black">Start the Lottery!</h1>
      <div className="">
        {isConnected ? (
          <button
            onClick={handleStartLottery}
            type="button"
            className="rounded-2xl bg-blue-500 text-white text-lg px-8 py-3 hover:scale-105 duration-100"
          >
            Start
          </button>
        ) : (
          <ConnectButton />
        )}
      </div>
      {isLoading ? <Loading /> : null}
    </div>
  );
};
export default StartLottery;
