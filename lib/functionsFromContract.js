const { ethers } = require("ethers");

const contractABI = `[{"inputs":[{"internalType":"uint256","name":"_lotteryDuration","type":"uint256"},{"internalType":"uint256","name":"_minDepositAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"LotteryEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endTime","type":"uint256"},{"indexed":false,"internalType":"address","name":"LotteryDeployer","type":"address"}],"name":"LotteryStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WinnerSelected","type":"event"},{"inputs":[],"name":"deployer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"enter","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getLotteryManager","outputs":[{"internalType":"address","name":"LotteryDeployer","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLotteryTimes","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlayers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRandom","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lotteryDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lotteryEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lotteryStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minDepositAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pickWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newRandomNumber","type":"uint256"}],"name":"setRandom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startLottery","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"state","outputs":[{"internalType":"enum Lottery.LotteryState","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}]`;
const contractAddress = "0x8a351b90584542FF0ABD9b3F3497d5A778980F94";

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
    // if (countdown < 0) {
    //   countdown = 0;
    // }
    return countdown;
  } catch (err) {
    console.error(err);
    return null;
  }
};
