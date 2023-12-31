import KT01BaseLayout from 'general/components/BaseLayout/KT01BaseLayout';
import Empty from 'general/components/Empty';
import AppResource from 'general/constants/AppResource';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import Account from './features/Account';
import Dashboard from './features/Dashboard';
import Minting from './features/Minting';
import FuntionPage from './features/function';

function OpenSea(props) {
  // MARK: --- Props ---
  const { t } = useTranslation();

  return (
    <KT01BaseLayout>
      <div id="opensea-container" className="container-fluid container-xl min-h-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mint" element={<Minting />} />
          <Route path="/account" element={<Account />} />
          <Route path="/function" element={<FuntionPage />} />

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
      </div>
    </KT01BaseLayout>
  );
}

export default OpenSea;
