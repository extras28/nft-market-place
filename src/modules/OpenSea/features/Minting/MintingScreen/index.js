import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FileUploader } from 'react-drag-drop-files';

MintingScreen.propTypes = {};

function MintingScreen(props) {
  // MARK --- Params ---
  const fileTypes = ['PNG', 'JPG', 'JPEG'];
  const [file, setFile] = useState(null);
  // MARK --- Functions ---
  function handleChange() {}
  return (
    <div className="row">
      <div className="col-lg-6 col-12">
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          label={'Tải lên hoặc kéo tệp nguồn vào đây'}
          classes="w-100"
          children={
            <div
              className="w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-3 bg-transparent p-6 rounded"
              style={{
                border: '2px dashed #3f425455',
              }}
            >
              {file ? (
                <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                  <i
                    className="fa-duotone fa-file-spreadsheet text-primary"
                    style={{
                      fontSize: '3rem',
                    }}
                  />
                  <h5 className="font-weight-bolder">{file?.name}</h5>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                  <p className="m-0">Kéo thả tệp nguồn vào đây</p>
                  <i
                    className="fa-regular fa-upload text-primary"
                    style={{
                      fontSize: '3rem',
                    }}
                  />
                  <p className="m-0">Hoặc</p>
                </div>
              )}
              <div
                className="bg-transparent px-4 py-3 rounded text-primary font-weight-bolder cursor-pointer bg-hover-primary text-hover-white"
                style={{ border: '1px solid #5180FB' }}
              >
                {file ? 'Chọn lại tệp' : 'Chọn tệp dữ liệu'}
              </div>

              <div>
                Chương trình chỉ hỗ trợ các tệp có định dạng{' '}
                {fileTypes
                  .map((item) => {
                    return `*.${item.toLowerCase()}`;
                  })
                  .join(', ')}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default MintingScreen;
