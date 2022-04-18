const { utils } = require("ethers");

async function main () {

  const _name = "VAL NFT";
  const _symbol = "VNFT";
  const _initBaseURI = "ipfs://QmZrmdeGsPWM1cm96uXyj1WEa4D7tVYcqjAwDNizcq6Cvr/";
  const _initNotRevealedUri = "ipfs://QmbsjygcPeessNb2YHw2HJEVRhT3GJyffxfkMZ5T2ZxSu2/hidden.json";
  // We receive the contract to deploy
  const Box = await ethers.getContractFactory('ValNft2');
  console.log('Deploying Box...');
  const box = await Box.deploy(_name, _symbol, _initBaseURI, _initNotRevealedUri);
  await box.deployed();
  console.log('Box deployed to:', box.address);
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
