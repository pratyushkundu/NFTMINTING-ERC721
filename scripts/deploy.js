async function main() {
    const MyNFT = await ethers.getContractFactory("myNFT")
  
    // Start deployment, returning a promise that resolves to a contract object
    const myNFT = await MyNFT.deploy()
    await myNFT.deployed()
    console.log("Contract deployed to address:", myNFT.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  //Contract deployed to address: 0xd0c22d8d07bBAe40BCBdadC8686C0E4C4842E3d5