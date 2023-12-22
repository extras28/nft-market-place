import React from 'react';
import { ethers } from 'ethers';

import abiMarketPlace from 'assets/abiMarketPlace.json';
import abiNFTContract from 'assets/abi.json';
import AppConfigs from 'general/constants/AppConfigs';
import Utils from 'general/utils/Utils';

const NFTcontractAddress = '0x430cb89B331a4A719E661E94EfEA72ac37f902b6';
const nftMarketPlaceAddress = '0xec5808E2d86293c6b29f0eD4E9a77c8EfA28fEa8';
const LISTING_FEE = 100000000000000n;

export default function index() {
  const getAllNFTs = async () => {
    const rpc = new ethers.providers.JsonRpcProvider(AppConfigs.rpcHttp);
    const contract = new ethers.Contract(nftMarketPlaceAddress, abiMarketPlace, rpc);
    const list = await contract.getListedNFTs();
    console.log(list);
    `                                                                             `;
  };

  const getMyNFTs = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const rpc = new ethers.providers.JsonRpcProvider(AppConfigs.rpcHttp);
    const contract = new ethers.Contract(nftMarketPlaceAddress, abiMarketPlace, rpc);
    const myNFTs = await contract.getMyNFTs(accounts[0]);
    console.log(myNFTs);
  };

  const getMyListNFTs = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const rpc = new ethers.providers.JsonRpcProvider(AppConfigs.rpcHttp);
    const contract = new ethers.Contract(nftMarketPlaceAddress, abiMarketPlace, rpc);
    const myNFTs = await contract.getMyListNFTs(accounts[0]);
    console.log(myNFTs);
  };

  const viewNFT = async (nftContractAddress, tokenID) => {
    const rpc = new ethers.providers.JsonRpcProvider(AppConfigs.rpcHttp);
    const contract = new ethers.Contract(nftContractAddress, abiNFTContract, rpc);
    const NFT_URI = await contract.tokenURI(ethers.utils.hexlify(tokenID));
    console.log(NFT_URI);
    return Utils.getTheNFTMetadataIPFSUrl(NFT_URI);
  };

  const listNFT = async (to, tokenID, price) => {
    let iface = new ethers.utils.Interface(abiMarketPlace);
    const data = iface.encodeFunctionData('listNFT', [
      NFTcontractAddress,
      ethers.utils.hexlify(tokenID),
      ethers.utils.hexlify(price),
    ]);
    console.log(data);
    sendRawTransaction(to, data, ethers.utils.hexlify(LISTING_FEE));
  };

  const resellNFT = async (to, tokenID, price) => {
    let iface = new ethers.utils.Interface(abiMarketPlace);
    const data = iface.encodeFunctionData('resellNft', [
      NFTcontractAddress,
      ethers.utils.hexlify(tokenID),
      ethers.utils.hexlify(price),
    ]);
    console.log(data);
    sendRawTransaction(to, data, ethers.utils.hexlify(LISTING_FEE));
  };

  const mintNFT = async (nftContractAddress, tokenURI) => {
    let iface = new ethers.utils.Interface(abiNFTContract);
    const data = iface.encodeFunctionData('mint', [tokenURI]);
    console.log(data);
    sendRawTransaction(nftContractAddress, data, ethers.utils.hexlify(0));
  };

  const buyNFT = async (nftContractAddress, tokenID, price) => {
    let iface = new ethers.utils.Interface(abiMarketPlace);
    const data = iface.encodeFunctionData('buyNFT', [
      nftContractAddress,
      ethers.utils.hexlify(tokenID),
    ]);
    console.log(ethers.utils.hexlify(price));
    sendRawTransaction(nftMarketPlaceAddress, data, ethers.utils.hexlify(price));
  };

  const sendRawTransaction = async (to, data, value) => {
    const rpcProvider = new ethers.providers.JsonRpcProvider(AppConfigs.rpcHttp);
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
    await window.ethereum
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
  };

  return (
    <div>
      <div>
        <button onClick={getAllNFTs}>getAllNFTs</button>
      </div>
      <div>
        <button onClick={getMyNFTs}>getMyNFTs</button>
      </div>
      <div>
        <button onClick={getMyListNFTs}>getMyListNFTs</button>
      </div>

      <div>
        <button onClick={() => viewNFT(NFTcontractAddress, 6)}>viewNFT</button>
      </div>
      <div>
        <button onClick={() => listNFT(nftMarketPlaceAddress, 6, 10000000000000000n)}>
          listNFT
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            mintNFT(NFTcontractAddress, 'QmXaH77tmpa5bCHvy5hepbUubpsh8WaveZMqkQYXVeJvQQ')
          }
        >
          Mint NFT
        </button>
      </div>
      <div>
        <button onClick={() => buyNFT(NFTcontractAddress, 1, 1000000n)}>Buy NFT</button>
      </div>
      <div>
        <button onClick={() => resellNFT(nftMarketPlaceAddress, 1, 1000000n)}>resell NFT</button>
      </div>
    </div>
  );
}
