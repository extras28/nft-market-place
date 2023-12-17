import React from 'react'
import { ethers } from 'ethers';

import abiMarketPlace from 'assets/abiMarketPlace.json';
import abiNFTContract from 'assets/abi.json'

const nftAddress = "0x92c1E2D41A35b24CCF020f76f94784c41E0fF257"

export default function index() {

    const getAllNFTs = async () => {
        const rpc = new ethers.providers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");
        const contract = new ethers.Contract(nftAddress, abiMarketPlace, rpc);
        const list = await contract.getListedNFTs();
        console.log(list);
    }

    const getMyNFTs = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const rpc = new ethers.providers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");
        const contract = new ethers.Contract(nftAddress, abiMarketPlace, rpc);
        let iface = new ethers.utils.Interface(abiMarketPlace);
        const data = iface.encodeFunctionData('getMyListNFTs', [
        ]);
        const tx = [
            {
                from: accounts[0],
                to: nftAddress,
                data,
            }
        ]
        const encodedData = await window.ethereum
            .request({
                method: 'eth_call',
                params: tx,
            })
            .then((result) => {
                console.log(result);
                console.log(iface.decodeFunctionData('getMyListNFTs', result));
            })
            .catch((err) => {
                console.log(err);
            });
        // const list = await contract.getMyListNFTs();
    }

    const viewNFT = async (nftContractAddress, tokenID) => {
        const rpc = new ethers.providers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");
        const contract = new ethers.Contract(nftContractAddress, abiNFTContract, rpc);
        const NFT_URI = await contract.tokenURI(ethers.utils.hexlify(tokenID));
        console.log(NFT_URI);
    }

    const listNFT = async (nftContractAddress, tokenID, price) => {
        console.log(ethers.utils.hexlify(tokenID));
        console.log(ethers.utils.hexlify(price));
        let iface = new ethers.utils.Interface(abiMarketPlace);
        const data = iface.encodeFunctionData('listNFT', [
            nftContractAddress, ethers.utils.hexlify(tokenID), ethers.utils.hexlify(price),
        ]);
        console.log(data);
        sendRawTransaction(nftContractAddress, data, ethers.utils.hexlify(100000000000000n))
    }

    const mintNFT = async (nftContractAddress, tokenURI) => {
        let iface = new ethers.utils.Interface(abiNFTContract);
        const data = iface.encodeFunctionData('mint', [
            tokenURI
        ]);
        console.log(data);
        sendRawTransaction(nftContractAddress, data, ethers.utils.hexlify(0))
    }

    const sendRawTransaction = async (to, data, value) => {
        const rpcProvider = new ethers.providers.JsonRpcProvider(
            'https://eth-sepolia.public.blastapi.io'
        );
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const gasPrice = await rpcProvider.getGasPrice();
        console.log(gasPrice, value);
        const tx = [
            {
                from: accounts[0],
                gasLimit: ethers.utils.hexlify(300000),
                gasPrice: gasPrice.toHexString(),
                to,
                value,
                data,
            },
        ];
        const transactionHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: tx,
            })
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div>
            <div>
                <button onClick={getAllNFTs}>
                    List All NFT
                </button>
            </div>
            <div>
                <button onClick={getMyNFTs}>
                    List My NFT
                </button>
            </div>
            <div>
                <button onClick={() => viewNFT("0x1Fe3A78B9eD952Bff67a7267B4DeD000B3Db21D9", 1)}>
                    View URI
                </button>
            </div>
            <div>
                <button onClick={() => listNFT("0x1Fe3A78B9eD952Bff67a7267B4DeD000B3Db21D9", 1, 1000000n)}>List NFT</button>
            </div>
            <div>
                <button onClick={() => mintNFT("0x1Fe3A78B9eD952Bff67a7267B4DeD000B3Db21D9", "QmPf9ac1zRbdYgbEsZXmT3bbVG7MtEhzjqUG6yTBU4uwvo")}>
                    Mint NFT
                </button>
            </div>
        </div>
    )
}
