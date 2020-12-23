import { React } from 'react';
import PropTypes from 'prop-types';

const ComparisonResults = ({ data, setshowUnmatched }) => {
  
  return (
    <>
      <div className="card">
        <div className="row ">
          <div className="comparison-wrapper">
            <h5 className="heading">Comparison Results</h5>
            <div style={{ display: 'flex' }}>
              {data.map((entry, i) => {
                return (
                  <div key={i} className="col m6">
                    <div className="card">
                      <div className="card-content results-wrapper">
                        <h6>{entry.fileName}</h6>
                        <div className="result row">
                          <p className="col m9">Total Records:</p>
                          <p className="value col m3">{entry.totalRecords}</p>
                        </div>

                        <div className="result row">
                          <p className="col m9">Matching Records:</p>
                          <p className="value col m3">{entry.matchCount}</p>
                        </div>

                        <div className="result row ">
                          <p className="col m9">Unmatched Records:</p>
                          <p className="value col m3">{entry.unMatchCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            <div className="button">
              <button
                className="btn submit-button Unmatched-Report-button"
                type="button"
                name="action"
                onClick={()=> setshowUnmatched(true)}
              >
                Unmatched Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ComparisonResults.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setshowUnmatched: PropTypes.func.isRequired
};

export default ComparisonResults;
