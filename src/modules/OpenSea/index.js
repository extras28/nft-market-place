import KT01BaseLayout from 'general/components/BaseLayout/KT01BaseLayout';
import Empty from 'general/components/Empty';
import AppResource from 'general/constants/AppResource';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './features/Dashboard';

function OpenSea(props) {
  // MARK: --- Props ---
  const { t } = useTranslation();

  return (
    <KT01BaseLayout>
      <div id="opensea-container" className="container-fluid container-xl min-h-100">
        <Routes>
          {/* <Route path="/" element={<Navigate to="opensea" />} /> */}
          <Route path="/" element={<Dashboard />} />

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
