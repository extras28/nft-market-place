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

  getRandomImageLink: (width, height) => {
    const size = width && height ? `/${width}/${height}` : null;
    const randomImageLink = `https://random.imagecdn.app${size}`;
    return randomImageLink;
  },

  ethToBigNumber: (eth) => {
    // 1 ETH = 10^18 Wei
    const weiPerEth = 1e18;

    // Convert ETH to Wei
    const wei = eth * weiPerEth;

    return wei;
  },

  weiHexToEth: (weiHex) => {
    // Convert hexadecimal Wei to decimal
    const weiDecimal = parseInt(weiHex, 16);

    // 1 ETH = 10^18 Wei
    const weiPerEth = 1e18;

    // Convert Wei to ETH
    const eth = weiDecimal / weiPerEth;

    return eth;
  },
};

export default Utils;
