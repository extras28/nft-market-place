import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OSNFTCard from 'general/components/OpenSeaComponent/OSNFTCard';
import TransactionHelper from 'general/helpers/TransactionHelper';
import AppConfigs from 'general/constants/AppConfigs';
import Loading from 'general/components/Loading';

MyNFTScreen.propTypes = {};

const sTag = '[MyNFTScreen]';

function MyNFTScreen(props) {
  //MARK --- Patams ---
  const [listNFT, setListNFT] = useState([]);
  const [loading, setLoading] = useState(false);

  // MARK --- Functions ---
  async function getMyNFTScreens() {
    setLoading(true);
    try {
      const rs = await TransactionHelper.getMyNFTs();
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
    getMyNFTScreens();
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
          key={index}
          image={item.view}
          price={item.price}
          title={`#${item.tokenId}`}
          buttonTitle="Resell"
        />
      ))}
    </div>
  );
}

export default MyNFTScreen;
