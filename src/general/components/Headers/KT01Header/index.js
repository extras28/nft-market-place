// import 'assets/styles/keen/theme01/layout/header/base/light.css';
import 'assets/styles/keen/theme01/layout/header/menu/dark.css';
import AppResource from 'general/constants/AppResource';
import useRouter from 'hooks/useRouter';
import _ from 'lodash';
// import OffcanvasSearch from 'modules/OpenSea/features/Dashboard/components/OffcanvasSearch';
import { MetaMaskButton } from '@metamask/sdk-react-ui';
import KeenSearchBarNoFormik from 'general/components/OtherKeenComponents/KeenSearchBarNoFormik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './style.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  {
    text: 'Create',
    path: 'mint',
    // subMenuItems: [
    //   { text: 'My Account', icon: AppResource.icons.keens.briefcase, path: 'opensea/mint' },
    //   { text: 'Task Manager', icon: AppResource.icons.keens.briefcase, path: '', label: '2' },
    //   {
    //     text: 'Team Manager',
    //     icon: AppResource.icons.keens.cmd,
    //     path: '',
    //     subMenuItems: [
    //       { text: 'Add Team Member', path: '' },
    //       { text: 'Edit Team Member', path: '' },
    //       { text: 'Delete Team Member', path: '' },
    //       { text: 'Team Member Reports', path: '' },
    //       { text: 'Assign Tasks', path: '' },
    //       { text: 'Promote Team Member', path: '' },
    //     ],
    //   },
    //   {
    //     text: 'Projects Manager',
    //     icon: AppResource.icons.keens.mailbox,
    //     path: '',
    //     subMenuItems: [
    //       { text: 'Latest Projects', path: '' },
    //       { text: 'Ongoing Projects', path: '' },
    //       { text: 'Urgent Projects', path: '' },
    //       { text: 'Completed Projects', path: '' },
    //       { text: 'Dropped Projects', path: '' },
    //     ],
    //   },
    //   { text: 'Create New Project', icon: AppResource.icons.keens.spam, path: '' },
    // ],
  },
  // {
  //   text: 'Test function',
  //   path: 'function',
  // },
];

function KT01Header(props) {
  // MARK: --- Params ---
  const { t } = useTranslation();
  const router = useRouter();
  const pathName = router.pathname;
  const arrPathNameItems = _.chain(pathName).split('/').compact().value();
  const headerTitle = _.chain(arrPathNameItems).last().capitalize().value();
  const currentLoggedInUser = useSelector((state) => state.auth?.current);
  const navigate = useNavigate();
  const location = useLocation();
  const isMintingScreen = location.pathname === '/opensea/mint';

  // MARK: --- Hooks ---
  useEffect(() => {
    new KTOffcanvas('kt_header_menu_wrapper', {
      baseClass: 'header-menu-wrapper',
      overlay: true,
      // closeBy: '',
      toggleBy: {
        target: 'kt_header_mobile_toggle',
      },
    });

    if (KTMenu !== undefined) {
      new KTMenu('kt_header_menu', {
        submenu: {
          desktop: 'dropdown',
          tablet: 'accordion',
          mobile: 'accordion',
        },
      });
    }
  }, []);

  return (
    <div
      id="kt_header"
      className="header header-fixed border-bottom"
      style={{ backgroundColor: 'rgb(18, 18, 18)' }}
    >
      <div className="container-xl d-flex align-items-stretch justify-content-between">
        {/* Header menu wrapper */}
        <div id="kt_header_menu_wrapper" className="header-menu-wrapper header-menu-wrapper-left">
          {/* header menu */}
          <div
            id="kt_header_menu"
            className="header-menu header-menu-mobile header-menu-layout-default"
          >
            {isMintingScreen ? (
              <div className="d-flex justify-content-center align-items-center">
                <div
                  onClick={() => navigate(-1)}
                  className="btn btn-outline-secondary h-40px w-40px d-flex justify-content-center align-items-center"
                >
                  <i className="fa-solid fa-arrow-left p-0"></i>
                </div>
              </div>
            ) : (
              <div
                className="d-flex justify-content-center align-items-center cursor-pointer"
                onClick={() => navigate('/opensea')}
              >
                <img className="h-60px w-150px" src={AppResource.images.logoWithText} />
              </div>
            )}

            {/* menu nav */}
            {isMintingScreen ? null : (
              <ul className="menu-nav">
                {menuItems.map((item, index) => {
                  const hasSubMenuLV1Items = item?.subMenuItems !== undefined;

                  return (
                    <li
                      key={index}
                      className="menu-item menu-item-submenu menu-item-rel menu-item-open-dropdown"
                      data-menu-toggle="click"
                    >
                      <div onClick={() => navigate(item.path)} className="menu-link menu-toggle">
                        <span className="menu-text">{item.text}</span>
                        <i className="menu-arrow" />
                      </div>
                      {/* Sub menu items level 1 */}
                      {hasSubMenuLV1Items && (
                        <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                          <ul className="menu-subnav">
                            {item?.subMenuItems?.map((subItemLV1, subIndexLV1) => {
                              const hasSubMenuLV2Items = subItemLV1?.subMenuItems !== undefined;

                              return (
                                <li
                                  key={subIndexLV1}
                                  className={`menu-item ${
                                    hasSubMenuLV2Items && 'menu-item-submenu'
                                  }`}
                                  data-menu-toggle="hover"
                                >
                                  <a href="#" className="menu-link menu-toggle">
                                    {subItemLV1.icon ? (
                                      <span className="svg-icon menu-icon">
                                        <img
                                          alt=""
                                          src={subItemLV1.icon}
                                          className="w-20px h-20px"
                                        />
                                      </span>
                                    ) : (
                                      <i className="menu-bullet menu-bullet-dot">
                                        <span></span>
                                      </i>
                                    )}
                                    <span className="menu-text">{subItemLV1.text}</span>
                                    {subItemLV1?.label && (
                                      <span className="menu-label">
                                        <span className="label label-success label-rounded">
                                          {subItemLV1.label}
                                        </span>
                                      </span>
                                    )}
                                    {hasSubMenuLV2Items && <i className="menu-arrow" />}
                                  </a>
                                  {/* Sub menu items level 2 */}
                                  {hasSubMenuLV2Items && (
                                    <div className="menu-submenu menu-submenu-classic menu-submenu-right">
                                      <ul className="menu-subnav">
                                        {subItemLV1?.subMenuItems?.map(
                                          (subItemLV2, subIndexLV2) => {
                                            const hasSubMenuLV3Items =
                                              subItemLV2?.subMenuItems !== undefined;

                                            return (
                                              <li
                                                key={subIndexLV2}
                                                className={`menu-item ${
                                                  hasSubMenuLV3Items && 'menu-item-submenu'
                                                }`}
                                                data-menu-toggle="hover"
                                              >
                                                <a href="#" className="menu-link menu-toggle">
                                                  {subItemLV2.icon ? (
                                                    <span className="svg-icon menu-icon">
                                                      <img
                                                        alt=""
                                                        src={subItemLV2.icon}
                                                        className="w-20px h-20px"
                                                      />
                                                    </span>
                                                  ) : (
                                                    <i className="menu-bullet menu-bullet-line">
                                                      <span></span>
                                                    </i>
                                                  )}
                                                  <span className="menu-text">
                                                    {subItemLV2.text}
                                                  </span>
                                                  {subItemLV2?.label && (
                                                    <span className="menu-label">
                                                      <span className="label label-success label-rounded">
                                                        {subItemLV2.label}
                                                      </span>
                                                    </span>
                                                  )}
                                                  {hasSubMenuLV3Items && (
                                                    <i className="menu-arrow" />
                                                  )}
                                                </a>
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        {/* {isMintingScreen ? null : (
          <div className="d-flex justify-content-center align-items-center rounded min-w-350px">
            <KeenSearchBarNoFormik className="w-100" placeholder={t('Search')} />
          </div>
        )} */}
        <div className="d-flex flex-row justify-content-between align-items-center">
          {/* Top bar */}
          <div className="topbar">
            {/* search */}
            <div className="topbar-item ml-4">
              <div className="d-flex align-items-center cursor-pointer">
                <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>
              </div>
            </div>
          </div>

          {/* avatar */}
          <div className="app-navbar-item ms-2 ms-1 ms-lg-3 d-flex justify-content-center align-items-center">
            <div
              onClick={() => navigate('/opensea/account')}
              className="cursor-pointer symbol symbol-20px symbol-md-20px"
            >
              <img src="https://preview.keenthemes.com/keen/demo1/assets/media/avatars/300-3.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KT01Header;
