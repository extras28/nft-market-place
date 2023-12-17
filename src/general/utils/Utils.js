// Util functions
import { sha256 } from 'js-sha256';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import Global from './Global';
import AppConfigs from 'general/constants/AppConfigs';
moment.locale('vi');
import abi from 'assets/abi.json';
import { ethers } from 'ethers';

const Utils = {
  // sha256
  sha256: (text) => {
    return sha256(text);
  },

  // Check object empty
  isObjectEmpty: (obj) => {
    return Utils.isObjectNull(obj) || (Object.keys(obj).length === 0 && obj.constructor === Object);
  },

  // Get full url
  getFullUrl: (url) => {
    if (url && !url.startsWith('http') && !url.startsWith('blob')) {
      // console.log(`${process.env.REACT_APP_BASE_URL}${encodeURI(url)}`);
      return `${process.env.REACT_APP_BASE_URL}${encodeURI(url)}`;
    }
    // console.log(encodeURI(url));
    return encodeURI(url);
  },

  // Check is full url
  checkFullUrl: (url) => {
    if (url && url.startsWith('http')) {
      return true;
    }
    return false;
  },

  // Check object null|undefine
  isObjectNull: (obj) => {
    return obj === null || obj === undefined || obj === 'NULL';
  },

  // convert first character of string to uppercase
  convertFirstCharacterToUppercase: (stringToConvert) => {
    var firstCharacter = stringToConvert.substring(0, 1);
    var restString = stringToConvert.substring(1);
    return firstCharacter.toUpperCase() + restString;
  },

  // format number
  formatNumber: (iNumber) => {
    return new Intl.NumberFormat('de-DE').format(iNumber);
  },

  // format date time
  formatDateTime: (sDateTime, sFormat = 'DD/MM/YYYY HH:mm', utc = false) => {
    if (utc) {
      return moment(sDateTime).utc().format(sFormat);
    }
    return moment(sDateTime).local().format(sFormat);
  },

  // get time ago
  timeAgo: (sDateTime) => {
    const momentTime = moment.utc(sDateTime);
    return momentTime.fromNow();
  },

  // Change empty to null
  formatEmptyKey: (items) => {
    for (const [key, value] of Object.entries(items)) {
      if (value === '' || value === undefined) {
        items[key] = null;
      }
    }
  },

  // remove null key
  removeNullKey: (items) => {
    for (const [key, value] of Object.entries(items)) {
      if (_.isNull(value)) {
        delete items[key];
      }
    }
  },

  // Delete null
  formatNullKey: (items) => {
    for (const [key, value] of Object.entries(items)) {
      if (_.isNull(value)) {
        delete items[key];
      }
    }
  },

  // check pagination
  getNextPage: (pagination) => {
    const { total, count, currentPage } = pagination;

    const hasMorePage = currentPage * Global.gDefaultPagination < total;
    if (hasMorePage) {
      return currentPage + 1;
    }

    return null;
  },

  // get current url
  getCurrentUrl: () => {
    return window.location.href;
  },

  // get last array item
  getLastItem: (items) => {
    if (items && Array.isArray(items) && items.length > 0) {
      return items[items.length - 1];
    }
    return null;
  },

  // scroll div to bottom
  scrollToBottom: (id) => {
    var div = document.getElementById(id);
    if (div) {
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }
  },

  // Decode html
  decodeHTML: (html) => {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  },

  // open link in new tab
  openInNewTab: (url) => {
    window.open(url, '_blank').focus();
  },

  // open link in current tab
  openInCurrentTab: (url) => {
    window.open(url);
  },

  /**
   * Convert file size to MB
   * @param {number} sizeInBytes File size in bytes
   * @returns
   */
  fileSizeInMB: (sizeInBytes) => {
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    return sizeInMB;
  },

  /**
   *
   * @param {string} cid
   * @returns
   */
  getTheNFTMetadataIPFSUrl: (cid) => `https://gateway.pinata.cloud/ipfs/${cid}`,

  sendTransaction: async (value) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const rpc = new ethers.providers.JsonRpcProvider('https://eth-sepolia.public.blastapi.io');
    const gasPrice = rpc.getGasPrice();
    const nonce = await rpc.getTransactionCount(accounts[0], 'latest');
    let iface = new ethers.utils.Interface(abi);
    const data = iface.encodeFunctionData('mint', [
      'QmWDsUfEa8iXZtoeSz6jF6wdEYxhHWBQB7V9tpXAGxHNqr',
    ]);

    console.log({
      from: accounts[0], // The user's active address.
      to: AppConfigs.IndividualNFTs,
      value: '0x00',
      gasPrice,
      gasLimit: ethers.utils.hexlify(100000),
      nonce,
      data,
    });

    // window.ethereum.request({
    //   method: 'eth_sendTransaction',
    //   // The following sends an EIP-1559 transaction. Legacy transactions are also supported.
    //   params: [
    //     {
    //       from: accounts[0], // The user's active address.
    //       to: AppConfigs.IndividualNFTs,
    //       value: '0x00',
    //       gasPrice,
    //       gasLimit: ethers.utils.hexlify(100000),
    //       nonce,
    //       data,
    //     },
    //   ],
    // });
  },
};

export default Utils;
