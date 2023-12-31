// Toast
import AppToast from 'general/components/AppToast';
import { Suspense, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
// router
import PrivateRoute from 'general/components/AppRoutes/PrivateRoute';
import KTPageError01 from 'general/components/OtherKeenComponents/KTPageError01';
import OpenSea from 'modules/OpenSea';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AccountListener from 'general/listeners/AccountListener';

// Load BS
require('bootstrap/dist/js/bootstrap.min');
// Load KT plugins
require('assets/plugins/ktutil');
require('assets/plugins/ktmenu');
require('assets/plugins/ktoffcanvas');
require('assets/plugins/ktcookie');
require('assets/plugins/kttoggle');
// aside
require('assets/plugins/aside/aside');
require('assets/plugins/aside/aside-menu');
require('assets/plugins/aside/aside-toggle');
// header
require('assets/plugins/header/ktheader-mobile');
require('assets/plugins/header/ktheader-topbar');

window.$ = window.jQuery = require('jquery');
window.moment = require('moment');

const sTag = '[App]';

function App() {
  // MARK: --- Hooks ---
  useEffect(() => {
    console.log(`${sTag} did load`);

    return () => {
      console.log(`${sTag} will dismiss`);
    };
  }, []);

  return (
    <>
      {/* Router */}
      <BrowserRouter>
        {/* Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/*" element={<Navigate to="/opensea" />} />

            {/* OpenSea */}
            <Route
              path="/opensea/*"
              element={
                <PrivateRoute>
                  <OpenSea />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<KTPageError01 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      {/* Toast */}
      <AppToast />
      <AccountListener />
    </>
  );
}

export default App;
