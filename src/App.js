import './App.scss';
import React, { useState } from 'react';
import ComparisonResults from './components/ComparisonResults';
import UnmatchedReport from './components/UnmatchedReport';
import UploadFiles from './components/UploadFiles';
import M from 'materialize-css';
import axios from 'axios';

function App() {

  const [file1, setfile1] = useState(null);
  const [file2, setfile2] = useState(null);
  const [data, setData] = useState([]);
  const [showUnmatched, setshowUnmatched] = useState(false);
  const [loading, setloading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    const formData = new FormData();
    if (file1 && file2) {
      let res;
      formData.append('file1', file1);
      formData.append('file2', file2);
      try {
        const {REACT_APP_SERVER_URL} = process.env
        res = await axios.post(`${REACT_APP_SERVER_URL}/file-upload`, formData);
        setData(res.data);
      } catch (error) {
        M.toast({ html: `${error}` });
      }
    } else {
      M.toast({ html: 'Please select both files before submitting' });
    }

    setloading(false)
  };

  return (
    <div className="container">
      <UploadFiles
        loading={loading}
        setfile1={setfile1}
        setfile2={setfile2}
        handleSubmit={handleSubmit}
      />
      {!!data.length && (
        <ComparisonResults
          data={data}
          setshowUnmatched={setshowUnmatched}
        />
      )}
      {showUnmatched && <UnmatchedReport data={data} />}
    </div>
  );
}

export default App;
