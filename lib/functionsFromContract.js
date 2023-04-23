const { ethers } = require("ethers");
import { contractAddress, contractABI } from "./constants";

export const getRandomNumber = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    const randomBig = await contract.getRandomNumber();
    const random = randomBig._hex;
    const randomString = random.toString();
    return randomString;
  } catch (error) {
    console.error(error);
  }
};

export const getPreviousWinner = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    const previousWinner = await contract.getPreviousWinner();
    return previousWinner;
  } catch (error) {
    console.error(error);
  }
};

export const getPlayers = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const players = await contract.getPlayers();
    return players;
  } catch {
    (error) => {
      console.error(error);
    };
  }
};

export const getBalance = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    return balance;
  } catch {
    (error) => {
      console.error(error);
    };
  }
};

export const getState = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    const stateContract = await contract.state();
    return stateContract;
  } catch (error) {
    console.error(error);
  }
};

export const startLottery = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log("Starting the lottery...");
    const transactionResponse = await contract.startLottery();
    await transactionResponse.wait();
    console.log("The lottery is running!");
  } catch (error) {
    console.error(error);
  }
};

export const getCountDown = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    const bigTimestamp = await contract.getLotteryTimes();
    // timestamps when the lottery closes (in seconds)
    const timeover = Number(bigTimestamp[1]._hex);
    // Date.now() returns the timestamp of when the function is called (in milliseconds)
    const currentTimestamp = Date.now() / 1000;
    let countdown = Math.round(timeover - currentTimestamp);
    // console.log("bigTimestamp", bigTimestamp);
    if (countdown < 0) {
      countdown = 0;
    }
    return countdown;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const buyTicket = async (ethAmount) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log("Buying ticket...");
    const transactionResponse = await contract.enter({
      value: ethers.utils.parseEther(ethAmount),
    });
    await transactionResponse.wait();
    console.log("Ticket bought!");
    return true;
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

export const pickWinner = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log("Closing lottery...");
    const transactionResponse = await contract.pickWinner();
    await transactionResponse.wait();
    console.log("The lottery is closed.");
    return 1;
  } catch (error) {
    console.log(error);
  }
};

export const endLotteryIfNoOneJoins = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log("Closing lottery...");
    const transactionResponse = await contract.endLotteryIfNoOneJoins();
    await transactionResponse.wait();
    console.log("The lottery is closed.");
    return 2;
  } catch (error) {
    console.log(error);
  }
};
