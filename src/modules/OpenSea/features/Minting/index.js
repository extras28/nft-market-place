import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import AppResource from 'general/constants/AppResource';
import Empty from 'general/components/Empty';
import { useTranslation } from 'react-i18next';
import MintingScreen from './MintingScreen';

Minting.propTypes = {};

function Minting(props) {
  // MARK --- Params ---
  const { t } = useTranslation();
  return (
    <Routes>
      <Route path="*" element={<MintingScreen />} />

      <Route
        path="*"
        element={
          <Empty
            text={t('PageUnderConstruction')}
            buttonText={t('Refresh')}
            visible={false}
            imageEmpty={AppResource.images.errorStates.error404}
          />
        }
      />
    </Routes>
  );
}

export default Minting;
