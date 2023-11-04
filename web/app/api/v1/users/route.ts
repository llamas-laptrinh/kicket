import { NextResponse } from "next/server";
// import { Web3, Contract } from "web3";
import {ethers} from "ethers";
import userStorage from "@/app/utils/abi/userStorage.json";

const rpcURL = "https://public-en-baobab.klaytn.net/";

export async function GET(request: Request) {
  // const web3 = new Web3("https://public-en-baobab.klaytn.net/");

  const provider = new ethers.JsonRpcProvider(rpcURL);

  const metamask =
    "0666edd526c40ae29f42bd9baf9e1ca91b6b3d2018c39fa4744364b569d1dbd4";
  const baobab =
    "0x585ce92e36b68a12590f35e2837877064e65facf7cd1a55e15cd89cd96e0bf54";
  // const wallet = web3.eth.accounts.privateKeyToAccount(baobab);

  const contractAddress = "0x45DF5cd3b381062f8DF3daeBc057Da9BEFfeef67";

  const wallet = new ethers.Wallet(baobab, provider);
  const contract = new ethers.Contract(contractAddress, userStorage, wallet);

 
  // const tx = await contract.addUser(wallet.address, "dtd_dev");

  // let r = await tx.wait();
  // console.log(r);
  const txuser = await contract.getUserByAddress(wallet.address);
 
  console.log(txuser);
  return NextResponse.json({
    hello: "hello",
  });
}
