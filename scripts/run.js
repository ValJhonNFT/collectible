const { utils } = require("ethers");

async function main() {
    const baseTokenURI = "https://ipfs.moralis.io:2053/ipfs/QmVgLsTaK9tVA6QMygad4h4MNrwiZN5Y8KTuaE9Ah3S8CE/metadata/";

    // Get owner/deployer's wallet address
    const [owner] = await hre.ethers.getSigners();

    // Get contract that we want to deploy
    const contractFactory = await hre.ethers.getContractFactory("VALNFT");

    // Deploy contract with the correct constructor arguments
    const contract = await contractFactory.deploy(baseTokenURI);

    // Wait for this transaction to be mined
    await contract.deployed();

    // Get contract address
    console.log("Contract deployed to:", contract.address);

    // Reserve NFTs
    let txn = await contract.reserveNFTs();
    await txn.wait();
    console.log("No NFTs have been reserved");

    // Mint 3 NFTs by sending 0.03 ether
    txn = await contract.mintNFTs(0, { value: utils.parseEther('0.001') });
    await txn.wait()

    // Get all token IDs of the owner
    let tokens = await contract.tokensOfOwner(owner.address)
    console.log("Owner has tokens: ", tokens);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
