import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import { VscRefresh } from "react-icons/vsc";
import {
  getBalance,
  getCountDown,
  getPlayers,
} from "../lib/functionsFromContract";

const tab = [
  "0xA77aFBE129ae74869179df6cE9BA7b8d83Cbd4F1",
  "0x4F5c9a72905896bB157Be8fF8D3Fd62B21B882b4",
  "0xA77aFBE129ae74869179df6cE9BA7b8d83Cbd4F1",
  "0x4F5c9a72905896bB157Be8fF8D3Fd62B21B882b4",
  "0xA77aFBE129ae74869179df6cE9BA7b8d83Cbd4F1",
  "0x4F5c9a72905896bB157Be8fF8D3Fd62B21B882b4",
];

const CurrentLottery = ({ setWinner }) => {
  const [balance, setBalance] = useState("0.00");
  const [players, setPlayers] = useState([]);
  const [numberPlayers, setNumberPlayers] = useState(0);
  const [countdown, setCountdown] = useState("");
  //   const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const secondsRemaining = useRef(-1);

  const startCountDown = () => {
    // Calculate minutes and seconds remaining
    const minutes = Math.floor(secondsRemaining.current / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (secondsRemaining.current % 60).toString().padStart(2, "0");

    // Display the time
    if (secondsRemaining.current <= 0) {
      setCountdown(`00 min 00 sec`);
    } else {
      setCountdown(`${minutes} min ${seconds} sec`);
    }

    if (secondsRemaining.current === 0) {
      setWinner(true);
      fetchData();
    }

    if (secondsRemaining.current >= 0) {
      // Decrement seconds remaining
      secondsRemaining.current--;
    }
  };

  const fetchData = async () => {
    const bal = await getBalance();
    if (bal !== undefined) {
      // set balance with two decimal places in Ether
      setBalance((Number(bal) / 1e18).toFixed(2));
    }
    secondsRemaining.current = await getCountDown();
    // startCountDown(200);
    const _players = await getPlayers();
    if (_players) {
      setPlayers(_players);
      setNumberPlayers(_players.length);
    }
  };

  useEffect(() => {
    const lotteryCountDown = setInterval(startCountDown, 1000);

    return () => clearInterval(lotteryCountDown);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-[500px] rounded-[1.3rem] p-10 bg-[#EEEEEE] z-10 overflow-hidden flex flex-col items-center justify-center gap-5">
      <div className="flex flex-row gap-4">
        <h1 className="text-4xl text-black">Current Lottery</h1>
        <button className=" pb-2" onClick={fetchData}>
          <VscRefresh className="w-8 h-8 hover:rotate-45 duration-200" />
        </button>
      </div>
      <div className="w-full rounded-lg bg-black/10 px-6 py-2 text-center text-2xl font-semibold text-blue-600">
        {countdown}
      </div>
      <div className="w-full rounded-lg flex flex-row justify-between gap-2 bg-[#FFD600] bg-opacity-[0.69] px-6 py-2">
        <p className="text-2xl text-black">POT</p>
        <p className="text-2xl font-bold text-black inline">{balance} ETH</p>
      </div>
      <div className="w-full rounded-lg bg-black/10 flex flex-col px-6 py-3 pb-5 gap-2">
        <div className="flex flex-row gap-2">
          <p className="text-2xl">Players</p>
          <div className="px-2 py-[1px] bg-white text-blue-500 rounded-lg text-xl">
            {numberPlayers}
          </div>
        </div>
        <div className="px-10 w-full h-[1px] rounded-full bg-black/30" />
        <div className="flex flex-col max-h-[300px] overflow-y-auto">
          {players.map((address, index) => (
            <p
              className={classNames(
                "truncate py-[2px] px-2 rounded-lg flex shrink-0 ",
                index % 2 ? "bg-white/40" : ""
              )}
            >
              {index + 1}. {address}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentLottery;
