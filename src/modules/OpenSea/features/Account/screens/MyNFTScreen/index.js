import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OSNFTCard from 'general/components/OpenSeaComponent/OSNFTCard';
import TransactionHelper from 'general/helpers/TransactionHelper';
import AppConfigs from 'general/constants/AppConfigs';
import Loading from 'general/components/Loading';
import OSModal from 'general/components/OpenSeaComponent/OSModal';
import KTFormGroup from 'general/components/OtherKeenComponents/Forms/KTFormGroup';
import { FastField, Formik } from 'formik';
import KTFormInput, {
  KTFormInputType,
} from 'general/components/OtherKeenComponents/Forms/KTFormInput';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import ToastHelper from 'general/helpers/ToastHelper';
import Utils from 'general/utils/Utils';

MyNFTScreen.propTypes = {};

const sTag = '[MyNFTScreen]';

function MyNFTScreen(props) {
  //MARK --- Patams ---
  const [listNFT, setListNFT] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingResell, setLoadingResell] = useState(false);
  const [showModalResell, setShowModalResell] = useState(false);
  const { t } = useTranslation();
  const [selectedNFT, setSelectedNFT] = useState(null);

  // MARK --- Functions ---
  async function getMyNFTScreens() {
    setLoading(true);
    try {
      const rs = await TransactionHelper.getMyNFTs();
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

  async function handleResellNFT(values) {
    setLoadingResell(true);
    try {
      const params = { ...values };
      params.tokenId = Number(params.tokenId);
      params.price = Utils.ethToBigNumber(Number(params.price));

      await TransactionHelper.resellNFT(params.address, params.tokenId, params.price);
      ToastHelper.showSuccess(t('Your transaction has been send'));
      setShowModalResell(false);
      // router.navigate('/opensea');
    } catch (error) {
      console.warn(`${sTag} resell NFT error: ${error.message}`);
    }
    setLoadingResell(false);
  }

  // MARK: --- Hooks ---
  useEffect(() => {
    getMyNFTScreens();
  }, []);

  return (
    <Formik
      initialValues={{
        price: '',
        address: selectedNFT?.address,
        tokenId: selectedNFT?.tokenId,
      }}
      validationSchema={Yup.object({
        price: Yup.number().required(t('Required')),
      })}
      enableReinitialize
      onSubmit={handleResellNFT}
    >
      {(formikProps) => (
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
              address={item.address}
              buttonTitle="Resell"
              onClick={() => {
                setSelectedNFT({
                  address: item.address,
                  tokenId: Number(item.tokenId),
                });
                setShowModalResell(true);
              }}
            />
          ))}

          <OSModal
            titleModal={t('Resell your NFT')}
            closeBtn={true}
            show={showModalResell}
            onHide={() => setShowModalResell(false)}
            modalSize="md"
            buttonNegative="Cancel"
            buttonPositive="Resell"
            handleSubmit={() => formikProps.handleSubmit()}
            contentModal={
              <div>
                {loadingResell ? (
                  <div className="d-flex justify-content-center align-items-center position-relative">
                    <div className="position-absolute">
                      <Loading />
                    </div>
                  </div>
                ) : null}
                {/* Address*/}
                <div>
                  <KTFormGroup
                    label={
                      <>
                        {t('Address')} <span className="text-danger">(*)</span>
                      </>
                    }
                    inputName="address"
                    inputElement={
                      <FastField name="address">
                        {({ field, form, meta }) => (
                          <KTFormInput
                            name={field.name}
                            value={field.value}
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                            }}
                            onBlur={() => {
                              form.setFieldTouched(field.name, true);
                            }}
                            enableCheckValid
                            isValid={_.isEmpty(meta.error)}
                            isTouched={meta.touched}
                            feedbackText={meta.error}
                            type={KTFormInputType.text}
                            placeholder={`${_.capitalize(t('address'))}...`}
                            disabled={true}
                          />
                        )}
                      </FastField>
                    }
                  />
                </div>

                {/* TokenId*/}
                <div>
                  <KTFormGroup
                    label={
                      <>
                        {t('TokenId')} <span className="text-danger">(*)</span>
                      </>
                    }
                    inputName="tokenId"
                    inputElement={
                      <FastField name="tokenId">
                        {({ field, form, meta }) => (
                          <KTFormInput
                            name={field.name}
                            value={field.value}
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                            }}
                            onBlur={() => {
                              form.setFieldTouched(field.name, true);
                            }}
                            enableCheckValid
                            isValid={_.isEmpty(meta.error)}
                            isTouched={meta.touched}
                            feedbackText={meta.error}
                            type={KTFormInputType.number}
                            placeholder={`${_.capitalize(t('Your NFT adress ID'))}...`}
                            disabled={true}
                          />
                        )}
                      </FastField>
                    }
                  />
                </div>

                {/* Price*/}
                <div>
                  <KTFormGroup
                    label={
                      <>
                        {t('Price')} <span className="text-danger">(*)</span>
                      </>
                    }
                    inputName="price"
                    inputElement={
                      <FastField name="price">
                        {({ field, form, meta }) => (
                          <KTFormInput
                            name={field.name}
                            value={field.value}
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                            }}
                            onBlur={() => {
                              form.setFieldTouched(field.name, true);
                            }}
                            enableCheckValid
                            isValid={_.isEmpty(meta.error)}
                            isTouched={meta.touched}
                            feedbackText={meta.error}
                            type={KTFormInputType.number}
                            placeholder={`${_.capitalize(
                              t('The price you want to sell NFT on our market')
                            )}...`}
                          />
                        )}
                      </FastField>
                    }
                  />
                </div>
              </div>
            }
          />
        </div>
      )}
    </Formik>
  );
}

export default MyNFTScreen;
