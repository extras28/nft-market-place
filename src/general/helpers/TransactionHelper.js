import { ethers } from 'ethers';
import AppConfigs from 'general/constants/AppConfigs';
import abiMarketPlace from 'assets/abiMarketPlace.json';
import abiNFTContract from 'assets/abi.json';
import Utils from 'general/utils/Utils';

const TransactionHelper = {
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
    const myListNFT = [];
    for (const rs of myNFTs) {
      const view = await TransactionHelper.viewNFT(AppConfigs.nftAddressContract, rs.tokenID._hex);
      myListNFT.push({ ...rs, view });
    }

    return myListNFT;
  },
  getAllNFTs: async () => {
    const rpc = new ethers.providers.JsonRpcProvider(AppConfigs.rpcHttp);
    const contract = new ethers.Contract(AppConfigs.marketPlaceContract, abiMarketPlace, rpc);
    const list = await contract.getListedNFTs();
    // console.log(Array.isArray(list));
    // const listNFT = [];
    // for (const rs of list) {
    //   const view = await TransactionHelper.viewNFT(
    //     AppConfigs.nftAddressContract,
    //     parseInt(rs[1]._hex, 16)
    //   );

    //   //   listNFT.push({ ...rs, view });
    // }

    return list;
  },
};

export default TransactionHelper;
