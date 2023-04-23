import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import InstructionsComponent from "../components/InstructionsComponent";
import Countdown from "../components/Countdown";
import Card from "../components/Card";
import DepositButtonExemple from "../components/DepositButtonExemple";
import Flash from "../components/Flash";
import Stars from "../components/Stars";
import { useState } from "react";
import ClientOnly from "../components/ClientOnly";
import { getState } from "../lib/functionsFromContract";
import CurrentLottery from "../components/CurrentLottery";

export default function Home() {
  const [lotteryStarted, setLotteryStarted] = useState(false);
  const [ticketBought, setTicketBought] = useState(false);
  const [winner, setWinner] = useState(false);

  const handleStateLottery = async () => {
    const stateContract = await getState();
    if (stateContract === 1) {
      setLotteryStarted(true);
    }
  };

  useEffect(() => {
    handleStateLottery();
  }, []);

  return (
    <div>
      <main className={styles.main}>
        <Flash />
        <div className="w-full h-full grid grid-cols-3">
          <div></div>
          <ClientOnly>
            <div className="h-full flex flex-col justify-center items-center">
              <Card
                ticketBought={ticketBought}
                setTicketBought={setTicketBought}
                lotteryStarted={lotteryStarted}
                setLotteryStarted={setLotteryStarted}
                winner={winner}
              />
            </div>
          </ClientOnly>
          {lotteryStarted ? (
            <CurrentLottery setWinner={setWinner} />
          ) : (
            <div></div>
          )}
        </div>
        <Stars />
      </main>
    </div>
  );
}
