import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FileUploader } from 'react-drag-drop-files';
import { FastField, Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import KTFormGroup from 'general/components/OtherKeenComponents/Forms/KTFormGroup';
import KTFormInput, {
  KTFormInputType,
} from 'general/components/OtherKeenComponents/Forms/KTFormInput';
import _ from 'lodash';
import KTFormTextArea from 'general/components/OtherKeenComponents/Forms/KTFormTextArea';
import './style.scss';
import axios from 'axios';
import AppConfigs from 'general/constants/AppConfigs';
import * as typechain from 'nft-marketplace-project';
import Utils from 'general/utils/Utils';
import { ethers } from 'ethers';
// import { ethers } from 'ethers';

MintingScreen.propTypes = {};

const sTag = '[MintingScreen]';

function MintingScreen(props) {
  // MARK --- Params ---
  const fileTypes = ['PNG', 'JPG', 'JPEG', 'WEBP'];
  const [file, setFile] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const { t } = useTranslation();
  const [validationFile, setValidationFile] = useState(true);

  // MARK --- Functions ---
  function handleChange(file) {
    setFile(file);
    if (file) {
      setValidationFile(true);
      setDisplayImage(URL.createObjectURL(file));
    }
  }

  function handleRemoveImage() {
    setFile(null);
    URL.revokeObjectURL(displayImage);
  }

  async function uploadToPinata(formData) {
    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data`,
          Authorization: `Bearer ${AppConfigs.pinataJWT}`,
        },
      });

      return res.data;
    } catch (error) {
      console.log(`${sTag} Upload to Pindata error: ${error.message}`);
    }
  }

  async function mintingNFT(cid) {
    try {
      debugger;
      const web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const individualContract = typechain.IndividualNFTs__factory.connect(
        AppConfigs.IndividualNFTs,
        web3provider
      );
      const nft = await individualContract.mint(cid);
      console.log('minted NFT', nft);
    } catch (error) {
      console.log(`${sTag} Minting NFT error: ${error.message}`);
    }
  }

  async function handleSubmit(values) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      let params = values;
      formData.append('pinataMetadata', JSON.stringify(params));
      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });
      formData.append('pinataOptions', pinataOptions);

      // upload to ipfs
      const pinataRes = await uploadToPinata(formData);

      // mint nft
      const mintedNFT = await mintingNFT(pinataRes.IpfsHash);

      console.log(mintedNFT);
      // Utils.sendTransaction('0x00', pinataRes.IpfsHash);
    } catch (error) {
      console.log(`${sTag} Submit error: ${error.message}`);
    }
  }

  useEffect(() => {}, []);
  return (
    <div className="MintingScreen">
      <h2 className="font-weight-bolder">Create an NFT </h2>
      <h4 className="mb-8">
        Once your item is minted you will not be able to change any of its information.
      </h4>
      <Formik
        initialValues={{
          name: '',
          description: '',
          externalLink: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required(t('Required')),
          externalLink: Yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
          ),
        })}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <div className="row">
            <div className="col-lg-6 col-12">
              {file ? (
                <div>
                  <div
                    className="MintingScreen_Image_Container position-relative rounded"
                    style={{ objectFit: 'cover', border: '2px dashed #3f425455' }}
                  >
                    <img
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      className="rounded"
                      src={displayImage}
                    />
                    <div
                      onClick={handleRemoveImage}
                      className="Delete_Button btn btn-outline-secondary position-absolute"
                      style={{ top: '20px', right: '20px' }}
                    >
                      <i className="fa-regular fa-trash p-0 "></i>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <FileUploader
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                    label={t('Drag and drop file')}
                    classes="w-100"
                    children={
                      <div
                        className="w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-3 bg-transparent rounded"
                        style={{
                          border: `2px dashed ${validationFile ? '#3f425455' : '#F64E60'}`,
                        }}
                      >
                        <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-3 bg-transparent p-6 rounded">
                          <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                            <p className="m-0">{t('Drag and drop file')}</p>
                            <i
                              className="fa-regular fa-upload text-primary"
                              style={{
                                fontSize: '3rem',
                              }}
                            />
                            <p className="m-0">{t('Or')}</p>
                          </div>

                          <div
                            className="bg-transparent px-4 py-3 rounded text-primary font-weight-bolder cursor-pointer bg-hover-primary text-hover-white"
                            style={{ border: '1px solid #5180FB' }}
                          >
                            {t('Browse files')}
                          </div>

                          <div>
                            {fileTypes
                              .map((item) => {
                                return `*.${item.toLowerCase()}`;
                              })
                              .join(', ')}
                          </div>
                        </div>
                      </div>
                    }
                  />
                  {!validationFile ? (
                    <span className="d-block invalid-feedback ">{t('No image is chosen !')}</span>
                  ) : null}
                </div>
              )}
            </div>
            <div className="col-lg-6 col-12">
              {/* Name*/}
              <div>
                <KTFormGroup
                  label={
                    <>
                      {t('Name')} <span className="text-danger">(*)</span>
                    </>
                  }
                  inputName="name"
                  inputElement={
                    <FastField name="name">
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
                          placeholder={`${_.capitalize(t('name'))}...`}
                        />
                      )}
                    </FastField>
                  }
                />
              </div>

              {/* Description*/}
              <div>
                <KTFormGroup
                  label={<>{t('Description')}</>}
                  inputName="description"
                  inputElement={
                    <FastField name="description">
                      {({ field, form, meta }) => (
                        <KTFormTextArea
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
                          rows={8}
                          placeholder={`${_.capitalize(t('description'))}...`}
                        />
                      )}
                    </FastField>
                  }
                />
              </div>

              <div>
                <KTFormGroup
                  label={<>{t('External link')}</>}
                  inputName="externalLink"
                  inputElement={
                    <FastField name="externalLink">
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
                          placeholder={'https//:blockchain.com'}
                        />
                      )}
                    </FastField>
                  }
                />
              </div>
            </div>

            {/* submit button */}
            <div className="d-flex justify-content-end">
              <div
                onClick={() => {
                  if (!file) {
                    setValidationFile(false);
                  }
                  formikProps.handleSubmit();
                }}
                className="btn btn-primary btn-lg"
              >
                {t('Create')}
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default MintingScreen;
