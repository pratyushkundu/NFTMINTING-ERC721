require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;// for creating a transaction
const PRIVATE_KEY = process.env.PRIVATE_KEY;// for signing a transaction
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contractabi = require("../artifacts/contracts/MYNFT.sol/myNFT.json");//used for getting abi
// console.log(JSON.stringify(contract.abi));

const contractAddress = "0xd0c22d8d07bBAe40BCBdadC8686C0E4C4842E3d5";
const nftcontract = new web3.eth.Contract(contractabi.abi, contractAddress);

// create a transaction
async function mintNFT(tokenURI) {

    // to generate nonce value
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

    //build transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftcontract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    // sign transaction
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        );
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        );
                    }
                }
            );
        })
        .catch((err) => {
            console.log(" Promise failed:", err);
        });
}

// call mintnft funtion and pass token uri link that is (metadata.json link) uploaded in pinata
mintNFT(
    "https://gateway.pinata.cloud/ipfs/QmY4bytY4zfpuYFEmxL39j3LiryQh7fxgQuU1gwNL26AuE"
);