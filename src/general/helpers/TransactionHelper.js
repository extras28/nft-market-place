const { ethers } = require('ethers');
const { default: AppConfigs } = require('general/constants/AppConfigs');

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
};

export default TransactionHelper;
