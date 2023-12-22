import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { useTranslation } from 'react-i18next';
import Utils from 'general/utils/Utils';

OSNFTCard.propTypes = {};

function OSNFTCard(props) {
  // MARK --- Params ---
  const { price, image, title, onClick } = props;
  const { t } = useTranslation();

  return (
    <div
      className="OSNFTCard cursor-pointer col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-8"
      onClick={onClick}
    >
      <div className="card-flyer">
        <div className="text-box position-relative">
          <div className="image-box">
            <img src={image} alt="" />
          </div>
          <div className="p-6">
            <h6 className="font-weight-bolder">{title}</h6>

            <span className="d-flex align-items-center">
              <i className="fab fa-ethereum mr-4"></i>
              <span>{`${price} ETH`}</span>
            </span>
          </div>
          <div className="position-absolute bottom-0 OSNFTCard_button overflow-hidden btn btn-primary w-100 rounded-top-0">
            {t('Buy now')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OSNFTCard;
