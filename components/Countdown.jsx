import React, { useEffect, useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { getCountDown } from "../lib//functionsFromContract";

const Countdown = () => {
  const [countDown, setCountDown] = useState(0);
  useEffect(() => {
    getCountDown()
      .then((result) => {
        console.log("_countdown", result);
        if (result) {
          setCountDown(Math.round(result));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {countDown ? (
        <div className="px-7 py-3 bg-white z-10 rounded-xl text-lg flex flex-row items-center relative gap-3">
          <BiTimeFive className="w-8 h-8" />
          <p>
            <span className="font-semibold">{countDown} seconds </span> until
            the end.
          </p>
        </div>
      ) : null}
    </>
  );
};

export default Countdown;
