import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import './style.scss';

OSNFTCard.propTypes = {
  price: PropTypes.number,
  image: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  isMine: PropTypes.bool,
  buttonTitle: PropTypes.string,
  address: PropTypes.string,
};

OSNFTCard.defaultProps = {
  price: 0,
  image: '',
  title: '',
  onClick: null,
  isMine: false,
  buttonTitle: 'Buy now',
  address: '',
};

function OSNFTCard(props) {
  // MARK --- Params ---
  const { price, image, title, onClick, isMine, buttonTitle, address, seller } = props;
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
            <p>
              <span>Address: </span>

              <span>{address?.replace(/(.{7}).+(.{7})/, '$1...$2')}</span>
            </p>
            {seller ? (
              <p>
                <span>Seller: </span>

                <span>{seller?.replace(/(.{7}).+(.{7})/, '$1...$2')}</span>
              </p>
            ) : null}

            <span className="d-flex align-items-center">
              <i className="fab fa-ethereum mr-4"></i>
              <span>{`${price} ETH`}</span>
            </span>
          </div>
          {!isMine ? (
            <div className="position-absolute bottom-0 OSNFTCard_button overflow-hidden btn btn-primary w-100 rounded-top-0">
              {t(buttonTitle)}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default OSNFTCard;
