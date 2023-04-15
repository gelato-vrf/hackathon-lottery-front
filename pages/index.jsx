import styles from "../styles/Home.module.css";
import InstructionsComponent from "../components/InstructionsComponent";
import Countdown from "../components/Countdown";
import Card from "../components/Card";
import DepositButtonExemple from "../components/DepositButtonExemple";
import Flash from "../components/Flash";
import Stars from "../components/Stars";
import { useState } from "react";

export default function Home({ provider, account }) {
  const [buyTicket, setBuyTicket] = useState(false);
  return (
    <div>
      <main className={styles.main}>
        <Flash />
        <Card account={account} buy={buyTicket} setBuy={setBuyTicket} />
        <Stars />
        <Countdown provider={provider} />
      </main>
    </div>
  );
}
