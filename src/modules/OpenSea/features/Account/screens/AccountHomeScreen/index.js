import AppTabs from 'general/components/AppTabs';
import Utils from 'general/utils/Utils';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MyListedNFT from '../MyListedNFTScreen';
import MyNFTScreen from '../MyNFTScreen';
import OSModal from 'general/components/OpenSeaComponent/OSModal';
import { useTranslation } from 'react-i18next';
import { FastField, Formik } from 'formik';
import KTFormGroup from 'general/components/OtherKeenComponents/Forms/KTFormGroup';
import KTFormInput, {
  KTFormInputType,
} from 'general/components/OtherKeenComponents/Forms/KTFormInput';
import * as Yup from 'yup';
import TransactionHelper from 'general/helpers/TransactionHelper';
import ToastHelper from 'general/helpers/ToastHelper';
import Loading from 'general/components/Loading';

AccountHomeScreen.propTypes = {};

const sTag = '[AccountHomeScreen]';

const tabs = ['My NFTs', 'Listed NFTs'];

function AccountHomeScreen(props) {
  // MARK: --- Params ---
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const currentAccount = useSelector((state) => state?.auth?.current);
  const [showModalListing, setShowModalListing] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  // MARK: --- Functions ---
  function handleSelectedTab(newTab) {
    setSelectedTab(newTab);
  }

  async function handleListNFT(values) {
    setLoading(true);
    try {
      const params = { ...values };
      params.tokenId = Number(params.tokenId);
      params.price = Utils.ethToBigNumber(Number(params.price));

      await TransactionHelper.listNFT(params.address, params.tokenId, params.price);
      ToastHelper.showSuccess(t('Your transaction has been send'));
      setShowModalListing(false);
      // router.navigate('/opensea');
    } catch (error) {
      console.warn(`${sTag} list NFT error: ${error.message}`);
    }
    setLoading(false);
  }

  return (
    <Formik
      initialValues={{
        address: '',
        tokenId: '',
        price: '',
      }}
      validationSchema={Yup.object({
        address: Yup.string().required(t('Required')),
        tokenId: Yup.number(),
        price: Yup.number(),
      })}
      enableReinitialize
      onSubmit={handleListNFT}
    >
      {(formikProps) => (
        <div className="Account flex-column-fluid">
          <div className="container-xxl p-0">
            {/* account navbar */}
            <div className="card card-flush mb-9" style={{ backgroundColor: '#15171C' }}>
              <div
                className="card-header rounded-top bgi-size-cover h-200px Account_CoverImage"
                style={{
                  backgroundPosition: '100% 50%',
                  backgroundImage: `url(${Utils.getRandomImageLink(2600, 900)})`,
                  borderBottomColor: 'rgba(255, 255, 255, 0.08)',
                }}
              ></div>
              <div className="card-body mt-n19">
                <div className="m-0">
                  <div className="d-flex flex-stack align-items-end pb-4 mt-n19">
                    <div className=" position-relative">
                      <div className="symbol symbol-120 symbol-lg-150 symbol-fixed mt-n3">
                        <img
                          src="https://preview.keenthemes.com/keen/demo1/assets/media/avatars/300-3.jpg"
                          alt="avatar"
                          style={{
                            border: '4px solid #FFFFFF',
                            borderRadius: '20px',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                      <p className="font-weight-bolder font-size-h3 text-remaining">User</p>
                      <p className="text-muted">
                        <i className="fa-brands fa-ethereum mr-4"></i>
                        {currentAccount ? currentAccount?.replace(/(.{7}).+(.{7})/, '$1...$2') : ''}
                      </p>
                    </div>
                    <div>
                      <div className="btn btn-success" onClick={() => setShowModalListing(true)}>
                        <i className="fa-solid fa-arrow-up-from-square"></i>
                        List your NFT
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* tab */}
            <div>
              <AppTabs
                tabs={tabs}
                activeTab={selectedTab}
                handleClick={handleSelectedTab}
                className="flex-grow-1"
              />
            </div>
            <div>
              {selectedTab === 'My NFTs' ? (
                <MyNFTScreen />
              ) : selectedTab === 'Listed NFTs' ? (
                <MyListedNFT />
              ) : (
                <></>
              )}
            </div>
          </div>

          <OSModal
            titleModal={t('List your NFT')}
            closeBtn={true}
            show={showModalListing}
            onHide={() => setShowModalListing(false)}
            modalSize="md"
            buttonNegative="Cancel"
            buttonPositive="List"
            handleSubmit={() => formikProps.handleSubmit()}
            contentModal={
              <div>
                {loading ? (
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

export default AccountHomeScreen;
