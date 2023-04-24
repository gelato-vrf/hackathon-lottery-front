import React, { useEffect, useState } from "react";
const { ethers } = require("ethers");
import { contractAddress, contractABI } from "../lib/constants";
import {
  endLotteryIfNoOneJoins,
  pickWinner,
  getPlayers,
  getPreviousWinner,
  getRandomNumber,
} from "../lib/functionsFromContract";
import Loading from "./Loading";
import { useAccount } from "wagmi";

const Winner = () => {
  const [winnerAddress, setWinnerAddress] = useState("");
  const [randomNumber, setRandomNumber] = useState("");
  const [pickedWinner, setPickedWinner] = useState(0);
  const [iWon, setIWon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useAccount();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractForEvent = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  const handleWinner = async () => {
    setIsLoading(true);
    let success = 0;
    const _players = await getPlayers();
    if (_players.length === 0) {
      success = await endLotteryIfNoOneJoins();
    } else {
      success = await pickWinner();
    }
    if (success === 1) {
      setPickedWinner(1);
      const winnerAddress_ = await getPreviousWinner();
      if (winnerAddress_ === address) {
        setIWon(true);
      }
      const randomNumber_ = await getRandomNumber();
      setWinnerAddress(winnerAddress_);
      setRandomNumber(randomNumber_);
      console.log(`The winner is: ${winnerAddress_}!`);
    } else if (success == 2) {
      setPickedWinner(2);
      console.log("No one participated at this lottery.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    contractForEvent.on("LotteryEnded", async () => {
      setPickedWinner(1);
      const winnerAddress_ = await getPreviousWinner();
      if (winnerAddress_ === address) {
        setIWon(true);
      }
      const randomNumber_ = await getRandomNumber();
      setWinnerAddress(winnerAddress_);
      setRandomNumber(randomNumber_);
      console.log(`The winner is: ${winnerAddress_}!`);
    });

    return () => {
      contractForEvent.removeAllListeners("LotteryEnded");
    };
  }, [contractForEvent]);

  return (
    <div className="w-full flex flex-col items-start justify-start gap-3 relative p-10">
      <div className="flex flex-col w-full items-center">
        {pickedWinner === 1 ? (
          iWon ? (
            <h1 className="text-4xl text-black text-center">
              <span>Congratulations</span>{" "}
              <span className="inline-block">🎉You Won!🎉</span>
            </h1>
          ) : (
            <h1 className="text-4xl text-black ">Lottery closed.</h1>
          )
        ) : pickedWinner === 2 ? (
          <h1 className="text-4xl text-black ">No Participants 😔</h1>
        ) : (
          <h1 className="text-4xl text-black ">Pick Winner</h1>
        )}
        <div className="max-w-[50px] w-full h-[2px] bg-black/40 rounded-full " />
      </div>
      <div className="flex flex-col pt-7">
        <h2 className="text-lg mb-0 w-full">Winner</h2>
        <p className="px-4 py-2 rounded-lg bg-black text-white truncate">
          {winnerAddress}
        </p>
      </div>
      {/* <div className="flex flex-col items-start">
        <h2 className="text-lg mb-0 w-full">Jackpot</h2>
        <p className="px-3 py-1 flex flex-initial grow-0 rounded-lg bg-white text-black text-xl font-medium truncate">
          0.04 ETH
        </p>
      </div> */}

      <div className="flex flex-col pb-7">
        <h2 className="text-lg mb-0 w-full">Random Number</h2>
        <p className="px-1 py-1  rounded-lg bg-black/50 text-white text-xs ">
          {randomNumber}
        </p>
      </div>

      <div className="w-full flex justify-center items-center">
        {pickedWinner !== 0 ? (
          <button
            type="button"
            onClick={() => {
              location.reload();
            }}
            className="rounded-2xl bg-blue-500 text-white text-lg px-8 py-3 hover:scale-105 duration-100"
          >
            try Again!
          </button>
        ) : (
          <button
            type="button"
            onClick={handleWinner}
            className="rounded-2xl border-4 border-blue-500 bg-transparent hover:bg-blue-500 text-blue-600 hover:text-white text-lg px-8 py-2 hover:scale-[1.02] duration-100"
          >
            Pick Winner
          </button>
        )}
      </div>
      {isLoading ? <Loading /> : null}
    </div>
  );
};

export default Winner;
