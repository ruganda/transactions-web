import React, { useState } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';

const UnmatchedReport = ({ data }) => {
  const [closeMatches, setcloseMatches] = useState([]);

  const getCloseMatches = (matches) => {
    if (matches.length === 0)
      M.toast({ html: 'No close matches found for this transaction!' });
    const matchIds = matches.map((trans) => trans.id);
    setcloseMatches(matchIds);
  };

  return (
    <>
    <p className='teal-text tip' >Tip: Click the Table cell to view close matches</p>
  

    <div className="unmatched-results" style={{ display: 'flex' }}>
      {data.map((entry, index) => {
        return (
          <div
            className="container table-container"
            style={{ borderRight: 'none' }}
            key={index}
          >
            <table>
              <thead>
                <tr>
                  <th>{`${
                    entry.fileName.substring(0, 13) +
                    (entry.fileName.length > 13 ? ' ...' : '')
                  }`}</th>
                </tr>
                <tr className="border-top">
                  <th>Date</th>
                  <th>Refence</th>
                  <th className="no-right-border"> Transaction</th>
                </tr>
              </thead>

              <tbody className={`${index === 0 ? 'border' : 'border-right'}`}>
                {entry.Unmatched.map((transaction,i) => {
                  return (
                    <tr
                      id={`tablerow${i}`}
                      key={transaction.id}
                      onClick={() => getCloseMatches(transaction.closeMatches)}
                      className={`${
                        closeMatches.includes(transaction.id)
                          ? 'close-matches'
                          : ''
                      }`}
                    >
                      <td className="date-column">
                        {transaction.TransactionDate}
                      </td>
                      <td>{transaction['WalletReference\r']}</td>
                      <td className="no-right-border">
                        {transaction.TransactionID}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
    </>
  );
};

UnmatchedReport.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UnmatchedReport;
