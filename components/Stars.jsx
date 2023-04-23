import React from "react";
import ticket from "../img/golden-ticket.png";

const Stars = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0 pointer-events-none flex flex-col items-center justify-around">
      <div className="w-full flex flex-row justify-around">
        <img
          src={ticket}
          alt=""
          className="w-36 h-36 animate-puls animate-bounce-slow"
        />
        <div className="w-36 h-36 rotate-180 animate-bounce-slow2">
          <img
            src="https://pancakeswap.finance/images/lottery/three-stars.png"
            alt=""
            className="w-full h-full rotate-180"
          />
        </div>
      </div>
      <div className="w-full flex flex-row justify-around">
        <div className="w-36 h-36 animate-bounce-slow3">
          <img
            src="https://pancakeswap.finance/images/lottery/star-big.png"
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="w-36 h-36 animate-bounce-slow4">
          <img
            src="https://pancakeswap.finance/images/lottery/star-big.png"
            alt=""
            className="w-full h-full rotate-180"
          />
        </div>
      </div>
    </div>
  );
};

export default Stars;
