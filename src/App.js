import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [accountsReport, setAccountsReport] = useState(null);
  const [collections, setCollections] = useState(null);
  const [badTransactions, setBadTransactions] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return alert('Please select a file');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3001/upload', formData);
      alert('File uploaded and processed successfully');
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    }
  };

const fetchAccountsReport = async () => {
  try {
    const response = await axios.get('http://localhost:3001/report/accounts');
    console.log('Accounts Report Raw Response:', response.data);  
    setAccountsReport(response.data); 
  } catch (err) {
    console.error('Error fetching accounts report:', err);
    alert('Error fetching accounts report');
  }
};

const fetchCollections = async () => {
  try {
    const response = await axios.get('http://localhost:3001/report/collections');
    console.log('Collections Report Raw Response:', response.data);  
    setCollections(response.data); 
  } catch (err) {
    console.error('Error fetching collections:', err);
    alert('Error fetching collections');
  }
};

  const fetchBadTransactions = async () => {
    const { data } = await axios.get('http://localhost:3001/report/bad-transactions');
    setBadTransactions(data);
  };

  const resetSystem = async () => {
    try {
      await axios.post('http://localhost:3001/reset');
      alert('System reset successfully');
      setAccountsReport(null);
      setCollections(null);
      setBadTransactions(null);
    } catch (err) {
      console.error(err);
      alert('Error resetting system');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Transaction Processor</h1>
      
      <div className="file-upload">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleFileUpload} className="button">Upload and Process File</button>
      </div>

      <div className="button-group">
        <button onClick={fetchAccountsReport} className="button">Fetch Accounts Report</button>
        <button onClick={fetchCollections} className="button">Fetch Collections</button>
        <button onClick={fetchBadTransactions} className="button">Fetch Bad Transactions</button>
        <button onClick={resetSystem} className="button reset-button">Reset System</button>
      </div>

      {accountsReport && (
        <div className="report">
          <h2>Accounts Report</h2>
          <pre>{JSON.stringify(accountsReport, null, 2)}</pre>
        </div>
      )}

      {collections && (
        <div className="report">
          <h2>Collections</h2>
          <pre>{JSON.stringify(collections, null, 2)}</pre>
        </div>
      )}

      {badTransactions && (
        <div className="report">
          <h2>Bad Transactions</h2>
          <pre>{JSON.stringify(badTransactions, null, 2)}</pre>
        </div>
      )}
    </div>
  ); };

export default App;
