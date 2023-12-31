import 'assets/styles/keen/theme01/layout/aside/dark.css';
import AppConfigs from 'general/constants/AppConfigs';
import AppResource from 'general/constants/AppResource';
import UserHelper from 'general/helpers/UserHelper';
import Utils from 'general/utils/Utils';
import useRouter from 'hooks/useRouter';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';

function KT01Sidebar(props) {
  // MARK: --- Params ---
  const router = useRouter();
  const pathName = router.pathname;
  const { t } = useTranslation();
  const currentAccount = useSelector((state) => state.auth.current);
  const menuItems = useMemo(() => {
    return [
      { type: 'section', text: t("CustomerSupport") },
      {
        type: 'item',
        text: t("Subscriber"),
        icon: 'fas fa-id-badge',
        path: '/subscriber',
        subMenuItems: [
          {
            type: 'item',
            text: t("ApplicationInformation"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
        ],
      },
      {
        type: 'item',
        text: t("MyMobiFoneCacheInformation"),
        icon: 'fas fa-qrcode',
        path: "",
        subMenuItems: [
          {
            type: 'item',
            text: t("ConsolidateInformation"),
            icon: 'fas fa-analytics',
            path: '/consolidateinfo/detail',
          },
          {
            type: 'item',
            text: t("PackageInformation"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("CacheChargeTransaction"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("AccountCacheInformation"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("ServiceCacheInformation"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("AutopayRegistrationList"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
        ],
      }, 
      {
        type: 'item',
        text: t("LookingUp"),
        icon: "fal fa-file-search",
        path: AppConfigs.invoiceUrl,
        subMenuItems: [
          {
            type: 'item',
            text: t("LookingUpSelectingNumberTransaction"),
            icon: 'fas fa-analytics',
            path: '/consolidateinfo/detail',
          },
          {
            type: 'item',
            text: t("LookingUpInterconnectionTransaction"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("EsimTransaction"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("UpdatingND49Information"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("CheckingNetworkHistory"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("AutopayTransaction"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("LookingUpDataPackageTransaction"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("TTTTTransaction"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("RechargeCardTransaction"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("CancelPackage&Data&ServiceTransaction"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("LoggingSMSSending"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("Feedback"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("ReceivingPushNotification"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("MoneyTransferSubscribers"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("LookingUpEKYCTransaction"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("CkeckingTwoConflictingPackages999"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
        ],
      }, 
      { type: 'section', text: t("ContentManagement") },
      {
        type: 'item',
        text: t("GeneralContent"),
        icon: "fal fa-newspaper",
        path: '/e-contract/notifications',
        subMenuItems: [
          {
            type: 'item',
            text: t("Banner"),
            icon: 'fas fa-analytics',
            path: '/consolidateinfo/detail',
          },
          {
            type: 'item',
            text: t("GroupOfArticles"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("Articles"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("PushNotification"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("GroupOfService"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("Services"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("ServicePack"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("PackageGroup"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("Package"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
        ],
      },
      {
        type: 'section',
        text: t("Report"),
      },
      {
        type: 'item',
        text: t("GeneralReport"),
        icon: "fad fa-file-chart-line",
        path: '/e-contract/notifications',
      },
      {
        type: 'item',
        text: t("UpdatingTTND49Report"),
        icon: "fad fa-file-chart-pie",
        path: '/e-contract/notifications',
      },
      {
        type: 'item',
        text: t("Esim"),
        icon: "fas fa-sim-card",
        path: '/e-contract/notifications',
        subMenuItems: [{
            type: 'item',
            text: t("TransactionStatistic"),
            icon: 'fas fa-analytics',
            path: '/consolidateinfo/detail',
          },
          {
            type: 'item',
            text: t("TopError"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
        ]
      },
      {
        type: 'item',
        text: t("LogIn"),
        icon: "fas fa-sign-in-alt",
        path: '/e-contract/notifications',
        subMenuItems: [{
          type: 'item',
          text: t("TimeOfFirstLogin"),
          icon: 'fas fa-analytics',
          path: '/consolidateinfo/detail',
        },
        {
          type: 'item',
          text: t("LogInStatistics"),
          icon: 'fas fa-analytics',
          path: '/subscriber/app-infor',
        },
        {
          type: 'item',
          text: t("TopCustomerLogInStatistics"),
          icon: 'fas fa-analytics',
          path: '/subscriber/app-infor',
        },
      ]
      },
      {
        type: 'item',
        text: t("Package/Data/Service"),
        icon: "fas fa-database",
        path: '/e-contract/notifications',
        subMenuItems: [{
            type: 'item',
            text: t("informationOnPurchasingPackages"),
            icon: 'fas fa-analytics',
            path: '/consolidateinfo/detail',
          },
          {
            type: 'item',
            text: t("Top10Packages"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("PurchasingDatapackageStatistics"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
          {
            type: 'item',
            text: t("Top10DataPackages"),
            icon: 'fas fa-analytics',
            path: '/subscriber/app-infor',
          },
        ]
      },
      {
        type: 'item',
        text: t("RechargeCard&Payment"),
        icon: "fas fa-money-check-alt",
        path: '/e-contract/notifications',
        subMenuItems: [{
          type: 'item',
          text: t("RechargeCardReport"),
          icon: 'fas fa-analytics',
          path: '/consolidateinfo/detail',
        },
        {
          type: 'item',
          text: t("MostRechargeCardTopSubscribers"),
          icon: 'fas fa-analytics',
          path: '/subscriber/app-infor',
        },
        {
          type: 'item',
          text: t("MostRechargeCardTopDenominations"),
          icon: 'fas fa-analytics',
          path: '/subscriber/app-infor',
        },
        {
          type: 'item',
          text: t("BankPaymentStatistics"),
          icon: 'fas fa-analytics',
          path: '/subscriber/app-infor',
        },
        {
          type: 'item',
          text: t("Top10BankMostPayment"),
          icon: 'fas fa-analytics',
          path: '/subscriber/app-infor',
        },
      ]
      },
      {
        type: 'item',
        text: t("OS&Device"),
        icon: "fas fa-cogs",
        path: '/e-contract/notifications',
        subMenuItems: [{
          type: 'item',
          text: t("MostUsingAndroidTopDevices"),
          icon: 'fas fa-analytics',
          path: '/consolidateinfo/detail',
        },
        {
          type: 'item',
          text: t("MostUsingIOSTopDevices"),
          icon: 'fas fa-analytics',
          path: '/subscriber/app-infor',
        },
        {
          type: 'item',
          text: t("MostUsingAndroidTopVersion"),
          icon: 'fas fa-analytics',
          path: '/subscriber/app-infor',
        },
        {
          type: 'item',
          text: t("MostUsingIOSTopVersion"),
          icon: 'fas fa-analytics',
          path: '/subscriber/app-infor',
        },
      ]
      },
      {
        type: 'section',
        text: t("SystemManagement"),
      },
      {
        type: 'item',
        text: t("Admins"),
        icon: "fas fa-user-shield",
        path: '/e-contract/notifications',
      },
      {
        type: 'item',
        text: t("SystemConfiguration"),
        icon: "fas fa-wrench",
        path: '/e-contract/notifications',
      },
      {
        type: 'item',
        text: t("AuditLog"),
        icon: "fal fa-file-invoice",
        path: '/e-contract/notifications',
      },
      {
        type: 'item',
        text: t("QueueDashboard"),
        icon: "fal fa-layer-group",
        path: '/e-contract/notifications',
      },
      {
        type: 'item',
        text: t("FeatureList"),
        icon: "fas fa-list",
        path: '/e-contract/notifications',
      },
      {
        type: 'item',
        text: t("DecentralizingSystem"),
        icon: "fas fa-users",
        path: '/e-contract/notifications',
        subMenuItems: [{
          type: 'item',
          text: t("GroupPermissionManagement"),
          icon: 'fas fa-analytics',
          path: '/consolidateinfo/detail',
        },
        {
          type: 'item',
          text: t("DecentralizingMajor"),
          icon: "",
          path: '/subscriber/app-infor',
        },
      ]
      },
    ];
  }, [currentAccount]);

  // MARK: --- Hooks ---
  useEffect(() => {
    // Init Aside
    if (KTLayoutAside !== undefined) {
      KTLayoutAside.init('kt_aside');
    }

    // Init Aside Toggle
    if (KTLayoutAsideToggle !== undefined) {
      KTLayoutAsideToggle.init('kt_aside_toggle');
    }

    // Init Aside Menu
    if (KTLayoutAsideMenu !== undefined) {
      KTLayoutAsideMenu.init('kt_aside_menu');
    }
  }, []);

  useEffect(() => {}, [currentAccount]);

  return (
    <div className="aside aside-left aside-fixed d-flex flex-column flex-row-auto" id="kt_aside">
      {/* Aside Header */}
      <div className="brand flex-column-auto">
        {/* logo */}
        <a href="#" className="brand-logo">
          <img
            className="h-25px"
            src={AppResource.icons.icLogoICorpLight}
            alt="logo"
            // style={{
            //     filter: 'invert(96%) sepia(38%) saturate(59%) hue-rotate(118deg) brightness(109%) contrast(100%)',
            // }}
          />
        </a>
        {/* button toggle */}
        <button className="brand-toggle btn btn-sm px-0 border-0" id="kt_aside_toggle">
          <span className="svg-icon svg-icon svg-icon-xl">
            <img src={AppResource.icons.keens.toggleRight} alt="toggle" />
          </span>
        </button>
      </div>

      {/* Aside Menu */}
      <div
        id="kt_aside_menu"
        className="aside-menu my-0"
        data-menu-scroll="1" // enable scroll
        data-menu-vertical="1"
        // data-menu-dropdown-timeout='500'
      >
        {/* Nav menu */}
        <ul className="menu-nav pt-0">
          {menuItems.map((item, index) => {
            // Item
            if (item?.type === 'item') {
              const hasSubMenuLV1Items = item?.subMenuItems !== undefined;

              return (
                <li
                  key={index}
                  className={`menu-item ${hasSubMenuLV1Items && 'menu-item-submenu'} ${
                    hasSubMenuLV1Items &&
                    item?.path?.length > 0 &&
                    pathName.includes(item.path) &&
                    'menu-item-open'
                  } ${
                    !hasSubMenuLV1Items &&
                    item?.path?.length > 0 &&
                    pathName === item.path &&
                    'menu-item-active'
                  }`}
                >
                  <Link
                    to={item?.path}
                    onClick={(e) => {
                      if (Utils.checkFullUrl(item?.path)) {
                        e.preventDefault();
                        Utils.openInNewTab(item?.path);
                      }
                    }}
                    className={`menu-link ${hasSubMenuLV1Items && 'menu-toggle'}`}
                  >
                    <span className="sgv-icon menu-icon">
                      <i className={`${item?.icon} text-white`} />
                    </span>
                    <span className="menu-text">{t(item?.text)}</span>
                    {item?.label && (
                      <span className="menu-label">
                        <span className="label label-rounded label-danger label-inline">
                          {item?.label}
                        </span>
                      </span>
                    )}
                    {hasSubMenuLV1Items && <i className="menu-arrow" />}
                  </Link>
                  {/* Sub menu items level 1 */}
                  {hasSubMenuLV1Items && (
                    <div className="menu-submenu">
                      <ul className="menu-subnav">
                        {item?.subMenuItems?.map((subItemLV1, subIndexLV1) => {
                          const hasSubMenuLV2Items = subItemLV1?.subMenuItems !== undefined;

                          return (
                            <li
                              key={subIndexLV1}
                              className={`menu-item ${hasSubMenuLV2Items && 'menu-item-submenu'} ${
                                hasSubMenuLV2Items &&
                                subItemLV1.path.length > 0 &&
                                pathName.includes(subItemLV1.path) &&
                                'menu-item-open'
                              } ${
                                !hasSubMenuLV2Items &&
                                subItemLV1.path.length > 0 &&
                                pathName.includes(subItemLV1.path) &&
                                'menu-item-active'
                              }`}
                            >
                              <Link
                                className={`menu-link rounded-0 ${
                                  hasSubMenuLV2Items && 'menu-toggle'
                                }`}
                                to={subItemLV1?.path}
                              >
                                <i className="menu-bullet menu-bullet-dot">
                                  <span></span>
                                </i>
                                <span className="menu-text">{t(subItemLV1?.text)}</span>
                                {subItemLV1?.label && (
                                  <span className="menu-label">
                                    <span className="label label-rounded label-danger label-inline">
                                      {subItemLV1?.label}
                                    </span>
                                  </span>
                                )}
                                {hasSubMenuLV2Items && <i className="menu-arrow" />}
                              </Link>
                              {/* Sub menu items level 2 */}
                              {hasSubMenuLV2Items && (
                                <div className="menu-submenu">
                                  <ul className="menu-subnav">
                                    {subItemLV1?.subMenuItems?.map((subItemLV2, subIndexLV2) => {
                                      const hasSubMenuLV3Items =
                                        subItemLV2?.subMenuItems !== undefined;

                                      return (
                                        <li
                                          key={subIndexLV2}
                                          className={`menu-item ${
                                            hasSubMenuLV3Items && 'menu-item-submenu'
                                          } ${
                                            hasSubMenuLV3Items &&
                                            subItemLV2.path.length > 0 &&
                                            pathName.includes(subItemLV2.path) &&
                                            'menu-item-open'
                                          } ${
                                            !hasSubMenuLV3Items &&
                                            subItemLV2.path.length > 0 &&
                                            pathName.includes(subItemLV2.path) &&
                                            'menu-item-active'
                                          }`}
                                        >
                                          <Link
                                            className={`menu-link rounded-0 ${
                                              hasSubMenuLV3Items && 'menu-toggle'
                                            }`}
                                            to={subItemLV2?.path}
                                          >
                                            <i className="menu-bullet menu-bullet-dot">
                                              <span></span>
                                            </i>
                                            <span className="menu-text">{t(subItemLV2?.text)}</span>
                                            {subItemLV2?.label && (
                                              <span className="menu-label">
                                                <span className="label label-rounded label-danger label-inline">
                                                  {subItemLV2?.label}
                                                </span>
                                              </span>
                                            )}
                                            {hasSubMenuLV3Items && <i className="menu-arrow" />}
                                          </Link>
                                          {/* Sub menu items level 3 */}
                                          {hasSubMenuLV3Items && (
                                            <div className="menu-submenu">
                                              <ul className="menu-subnav">
                                                {subItemLV2?.subMenuItems?.map(
                                                  (subItemLV3, subIndexLV3) => {
                                                    const hasSubMenuLV4Items =
                                                      subItemLV3?.subMenuItems !== undefined;

                                                    return (
                                                      <li
                                                        key={subIndexLV3}
                                                        className={`menu-item ${
                                                          hasSubMenuLV4Items && 'menu-item-submenu'
                                                        } ${
                                                          hasSubMenuLV4Items &&
                                                          subItemLV3.path.length > 0 &&
                                                          pathName.includes(subItemLV3.path) &&
                                                          'menu-item-open'
                                                        } ${
                                                          !hasSubMenuLV4Items &&
                                                          subItemLV3.path.length > 0 &&
                                                          pathName.includes(subItemLV3.path) &&
                                                          'menu-item-active'
                                                        }`}
                                                      >
                                                        <Link
                                                          className={`menu-link rounded-0 ${
                                                            hasSubMenuLV4Items && 'menu-toggle'
                                                          }`}
                                                          to={subItemLV3?.path}
                                                        >
                                                          <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                          </i>
                                                          <span className="menu-text">
                                                            {t(subItemLV3?.text)}
                                                          </span>
                                                          {subItemLV3?.label && (
                                                            <span className="menu-label">
                                                              <span className="label label-rounded label-danger label-inline">
                                                                {subItemLV3?.label}
                                                              </span>
                                                            </span>
                                                          )}
                                                          {hasSubMenuLV4Items && (
                                                            <i className="menu-arrow" />
                                                          )}
                                                        </Link>
                                                        {/* Sub menu items level 4 */}
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
                    </div>
                  )}
                </li>
              );
            }

            // Section
            if (item?.type === 'section') {
              return (
                <li key={index} className="menu-section mt-0">
                  <h4 className="menu-text">{t(item?.text)}</h4>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default KT01Sidebar;
