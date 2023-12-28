import { ethers } from "hardhat";

async function deployContractMarketPlace() {
  const [signer] = await ethers.getSigners();
  const martketPlace = await ethers.deployContract("NFTMarketplace", [], {
    gasLimit: 40000000,
    signer,
  });
  await martketPlace.waitForDeployment();
  console.log("deployed contract successfully", martketPlace.target);
  return martketPlace.target;
}

async function deployLockContract() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  const lock = await ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );
}
async function main() {
  await deployContractMarketPlace();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
