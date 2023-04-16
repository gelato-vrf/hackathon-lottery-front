const { ethers } = require("ethers");

const contractABI = `[{"inputs":[{"internalType":"uint256","name":"_lotteryDuration","type":"uint256"},{"internalType":"uint256","name":"_minDepositAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"LotteryEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endTime","type":"uint256"},{"indexed":false,"internalType":"address","name":"LotteryDeployer","type":"address"}],"name":"LotteryStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WinnerSelected","type":"event"},{"inputs":[],"name":"deployer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endLotteryIfNoOneJoins","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enter","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getLotteryManager","outputs":[{"internalType":"address","name":"LotteryDeployer","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLotteryTimes","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlayers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPreviousWinner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRandom","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lotteryDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lotteryEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lotteryStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDepositAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pickWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"previousWinner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newRandomNumber","type":"uint256"}],"name":"setRandom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startLottery","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"state","outputs":[{"internalType":"enum Lottery.LotteryState","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}]`;
const contractAddress = "0xB3E7AEB6652819E2b930e1FC7F88ED24e6442998";

export const getCountDown = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const bigTimestamp = await contract.getLotteryTimes();
    const timestart = BigInt(bigTimestamp[0]._hex);
    // timestamps when the lottery closes (in seconds)
    const timeover = Number(bigTimestamp[1]._hex);
    // Date.now() returns the timestamp of when the function is called (in milliseconds)
    const currentTimestamp = Date.now() / 1000;
    let countdown = Math.round(timeover - currentTimestamp);
    console.log("bigTimestamp", bigTimestamp);
    if (countdown < 0) {
      countdown = 0;
    }
    return countdown;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const buyTicket = async (ethAmount, setLoading, setTicketBought) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const transactionResponse = await contract.enter({
      value: ethers.utils.parseEther(ethAmount),
    });
    setLoading(true);
    await listenForTransactionMine(transactionResponse, provider);
    setLoading(false);
    setTicketBought(true);
  } catch (error) {
    console.log(error);
  }
};

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    try {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations. `
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

export const getWinner = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const bigTimestamp = await contract.getLotteryTimes();
  const timeover = Number(bigTimestamp[1]._hex);
  const currentTimestamp = Date.now() / 1000;
  let countdown = timeover - currentTimestamp;
  if (countdown < -10) {
    await contract.pickWinner();
    const previousWinner = await contract.previousWinner();
    console.log("previousWinner", previousWinner);
    console.log("contract", contract);
    return previousWinner;
  } else {
    alert(`The lottery is still open! ${countdown + 10}`);
  }
};
