const hre = require("hardhat");
async function main() {
  const ArbitrationCentre = await hre.ethers.getContractFactory(
    "ArbitrationCentre"
  );
  const arbitrationCentre = await ArbitrationCentre.deploy();

  await arbitrationCentre.deployed();
  console.log(`Contract deployed to ${arbitrationCentre.address}`);
  console.log(arbitrationCentre);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
