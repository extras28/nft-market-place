import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OSNFTCard from 'general/components/OpenSeaComponent/OSNFTCard';
import TransactionHelper from 'general/helpers/TransactionHelper';
import AppConfigs from 'general/constants/AppConfigs';
import Loading from 'general/components/Loading';

MyListedNFT.propTypes = {};

const sTag = '[MyListedNFTScreen]';

function MyListedNFT(props) {
  //MARK --- Patams ---
  const [listNFT, setListNFT] = useState([]);
  const [loading, setLoading] = useState(false);

  // MARK --- Functions ---
  async function getMyListedNFTs() {
    setLoading(true);
    try {
      const rs = await TransactionHelper.getMyListNFTs();
      console.log(rs);
      const NFTList = [];
      for (const nft of rs) {
        const tokenId = nft[1]._hex;
        const decimalTokenId = parseInt(tokenId, 16);
        if (!!decimalTokenId) {
          const decimalPrice = parseInt(nft[4]._hex, 16);
          const weiValue = BigInt(decimalPrice);
          const ethPrice = parseFloat(weiValue) / 1e18;

          const nftView = await TransactionHelper.viewNFT(
            AppConfigs.nftAddressContract,
            decimalTokenId
          );
          NFTList.push({
            price: ethPrice,
            view: nftView,
            tokenId: decimalTokenId,
            address: nft[0],
          });
        }
      }

      setListNFT(NFTList);
    } catch (error) {
      console.log(`${sTag} get list NFT error: ${error.message}`);
    }
    setLoading(false);
  }

  // MARK: --- Hooks ---
  useEffect(() => {
    getMyListedNFTs();
  }, []);

  return (
    <div className="row">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center position-relative">
          <div className="position-absolute">
            <Loading />
          </div>
        </div>
      ) : null}
      {listNFT.map((item, index) => (
        <OSNFTCard
          isMine={true}
          key={index}
          image={item.view}
          price={item.price}
          title={`#${item.tokenId}`}
          address={item.address}
        />
      ))}
    </div>
  );
}

export default MyListedNFT;
