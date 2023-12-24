import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

// duc tu
OSModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  titleModal: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  handleSubmit: PropTypes.func,
  contentModal: PropTypes.element,
  closeButton: PropTypes.bool,
  modalSize: PropTypes.string,
  buttonPositive: PropTypes.string,
  buttonNegative: PropTypes.string,
  textButton: PropTypes.string,
  onClickButtonAdd: PropTypes.func,
  style: PropTypes.object,
  btnModal: PropTypes.bool,
  textClear: PropTypes.string,
  onClickButtonClear: PropTypes.func,
  disableSubmit: PropTypes.bool,
  centered: PropTypes.bool,
};

OSModal.defaultProps = {
  show: false,
  onHide: () => {},
  handleSubmit: () => {},
  titleModal: '',
  contentModal: null,
  closeBtn: false,
  modalSize: 'md',
  buttonPositive: '',
  buttonNegative: '',
  textButton: '',
  btnModal: true,
  onClickButtonAdd: () => {},
  style: {},
  textClear: '',
  onClickButtonClear: () => {},
  disableSubmit: false,
  centered: true,
};

/**
 *
 * @param {{
 * titleModal: string|element,
 * contentModal: element,
 * show: boolean,
 * closeBtn: boolean,
 * onHide: function,
 * handleSubmit: function,
 * modalSize: string,
 * buttonPositive: string,
 * buttonNegative: string,
 * btnModal: boolean,
 * centered: boolean,
 *
 * }} props
 * @returns
 */
function OSModal(props) {
  const {
    show,
    onHide,
    handleSubmit,
    titleModal,
    contentModal,
    closeBtn,
    modalSize,
    buttonPositive,
    buttonNegative,
    textButton,
    onClickButtonAdd,
    style,
    btnModal,
    textClear,
    onClickButtonClear,
    disableSubmit,
    centered,
  } = props;
  const { t } = useTranslation();

  return (
    <Modal
      size={modalSize}
      aria-labelledby="contained-modal-title-vcenter"
      centered={centered}
      className="OSModal"
      show={show}
      onHide={onHide}
      backdrop="static"
      style={style}
    >
      <Modal.Header className="py-4" style={{ borderBottom: 'none' }}>
        <Modal.Title id="contained-modal-title-vcenter" className="font-weight-bolder text-white">
          {titleModal}
        </Modal.Title>
        <div>
          {closeBtn && (
            <i
              className="fa-sharp fa-solid fa-xmark px-3 py-2 rounded cursor-pointer button-close"
              onClick={() => onHide()}
            ></i>
          )}
        </div>
      </Modal.Header>
      <Modal.Body style={{ paddingTop: '0px' }} className="pb-4">
        {!_.isEmpty(contentModal) ? <div>{contentModal}</div> : ''}
        {btnModal && (
          <div className="d-flex justify-content-center mt-4">
            {/* <div>
              {textClear && (
                <VIButton
                  text={t(`${textClear}`)}
                  className={`btn-white`}
                  style={{ padding: '8px' }}
                  onClick={() => {
                    onClickButtonClear();
                  }}
                />
              )}
            </div> */}
            {/* <div>
              {textButton && (
                <VIButton
                  text={t(`${textButton}`)}
                  className={`btn-white`}
                  style={{ padding: '8px' }}
                  onClick={() => {
                    onClickButtonAdd();
                  }}
                  beforeIcon={<i className="fal fa-plus-circle"></i>}
                />
              )}
            </div> */}
            <div className="d-flex justify-content-end w-100 gap-3">
              {!_.isEmpty(buttonNegative) && (
                // <VIButton
                //   text={_.isEmpty(buttonNegative) ? t('Cancel') : buttonNegative}
                //   className={`btn-grey ${_.isEmpty(buttonPositive) ? '' : ''}`}
                //   style={{ padding: '8px' }}
                //   onClick={() => onHide()}
                // />
                <div className="btn btn-secondary" onClick={() => onHide()}>
                  {_.isEmpty(buttonNegative) ? t('Cancel') : buttonNegative}
                </div>
              )}

              {!_.isEmpty(buttonPositive) && (
                //<VIButton
                //  disabled={disableSubmit}
                //  text={_.isEmpty(buttonPositive) ? t('Save') : buttonPositive}
                //  className=""
                // style={{ padding: '8px' }}
                //  onClick={() => {
                //   handleSubmit();
                //  }}
                // />
                <Button
                  variant="success"
                  disabled={disableSubmit}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  {_.isEmpty(buttonPositive) ? t('Save') : buttonPositive}
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
export default OSModal;
