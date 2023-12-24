import { ethers } from 'ethers';
import AppConfigs from 'general/constants/AppConfigs';
import abiMarketPlace from 'assets/abiMarketPlace.json';
import abiNFTContract from 'assets/abi.json';
import Utils from 'general/utils/Utils';

const LISTING_FEE = 100000000000000n;

const TransactionHelper = {
  sendRawTransaction: async (to, data, value) => {
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
  },
  viewNFT: async (nftContractAddress, tokenID) => {
    const rpc = new ethers.providers.JsonRpcProvider(AppConfigs.rpcHttp);
    const contract = new ethers.Contract(nftContractAddress, abiNFTContract, rpc);
    const NFT_URI = await contract.tokenURI(ethers.utils.hexlify(tokenID));
    return Utils.getTheNFTMetadataIPFSUrl(NFT_URI);
  },
  getMyListNFTs: async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const rpc = new ethers.providers.JsonRpcProvider(AppConfigs.rpcHttp);
    const contract = new ethers.Contract(AppConfigs.marketPlaceContract, abiMarketPlace, rpc);
    const myNFTs = await contract.getMyListNFTs(accounts[0]);

    return myNFTs;
  },
  getAllNFTs: async () => {
    const rpc = new ethers.providers.JsonRpcProvider(AppConfigs.rpcHttp);
    const contract = new ethers.Contract(AppConfigs.marketPlaceContract, abiMarketPlace, rpc);
    const list = await contract.getListedNFTs();

    return list;
  },
  getMyNFTs: async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const rpc = new ethers.providers.JsonRpcProvider(AppConfigs.rpcHttp);
    const contract = new ethers.Contract(AppConfigs.marketPlaceContract, abiMarketPlace, rpc);
    const myNFTs = await contract.getMyNFTs(accounts[0]);

    return myNFTs;
  },
  listNFT: async (from, tokenID, price) => {
    const address = from ?? AppConfigs.nftAddressContract;
    let iface = new ethers.utils.Interface(abiMarketPlace);
    const data = iface.encodeFunctionData('listNFT', [
      address,
      ethers.utils.hexlify(tokenID),
      ethers.utils.hexlify(price),
    ]);
    console.log(data);
    TransactionHelper.sendRawTransaction(
      AppConfigs.marketPlaceContract,
      data,
      ethers.utils.hexlify(LISTING_FEE)
    );
    return data;
  },
  resellNFT: async (from, tokenID, price) => {
    const address = from ?? AppConfigs.nftAddressContract;
    let iface = new ethers.utils.Interface(abiMarketPlace);
    const data = iface.encodeFunctionData('resellNft', [
      address,
      ethers.utils.hexlify(tokenID),
      ethers.utils.hexlify(price),
    ]);
    console.log(data);
    sendRawTransaction(AppConfigs.marketPlaceContract, data, ethers.utils.hexlify(LISTING_FEE));
  },
};

export default TransactionHelper;
