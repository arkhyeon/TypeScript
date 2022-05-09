import React from 'react';
import './App.css';

function App() {
  // const content = 433;
  const listNum = 10;
  // const pageNum = 10;

  const pagination = () => {
    for (let i = 1; i < listNum; i++) {
      return <div>{i}</div>;
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>{() => pagination()}</div>
      </header>
    </div>
  );
}

export default App;
