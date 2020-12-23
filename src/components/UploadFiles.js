import React from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';

const UploadFiles = ({ setfile1, setfile2, handleSubmit, loading }) => {

  

  const handleFile1Change = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      if (file.type !== 'text/csv') {
        return M.toast({ html: 'Invalid file type! Please upload a csv file' });
      }
      setfile1(file);
    }
  };

  const handleFile2Change = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];

      if (file.type !== 'text/csv') {
        return M.toast({ html: 'Invalid file type! Please upload a csv file' });
      }
      setfile2(file);
    }
  };

  return (
    <>
    <div className='file-upload-container'>
      <form
        action="#"
        encType="multipart/form-data"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="col s12 ">
          <div className="card  main-card">
            <h6 className="heading heading1">Specify the Files to compare</h6>
            <div className="card-content row files-card">
              <div className="col label-wrapper">
                <label className="label">Select file 1</label>
              </div>
              <div className="file-field input-field col">
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    type="text"
                    
                  />
                </div>
                <div className="btn file-btn">
                  <span>Browse</span>
                  <input
                    type="file"
                    accept=".csv"
                    name="file1"
                    id='file1'
                    onChange={(e) => handleFile1Change(e)}
                  />
                </div>
              </div>
            </div>
            <div className="card-content row files-card">
              <div className="col label-wrapper">
                <label className="label">Select file 2</label>
              </div>
              <div className="file-field input-field col">
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    type="text"
                    accept=".csv"
                  />
                </div>
                <div className="btn file-btn">
                  <span>Browse</span>
                  <input
                    type="file"
                    accept=".csv"
                    name="file2"
                    id='file2'
                    onChange={(event) => handleFile2Change(event)}
                  />
                </div>
                {!loading && <button
                  className="btn waves-effect waves-light submit-button"
                  type="submit"
                  name="action"
                >
                  Submit
                </button>}
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>
    </>
  );
};
UploadFiles.propTypes = {
  setfile1: PropTypes.func.isRequired,
  setfile2: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default UploadFiles;
