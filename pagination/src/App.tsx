import React from 'react';
import './App.css';

function App() {
  // const content = 433;
  const listNum = [1,2,3,4,5,6,7,8,9,10];
  // const pageNum = 10;

  return (
    <div className="App">
      <header className="App-header">
        <div>{listNum.map((num) => {
          return <div>{num}</div>;
        })}</div>
      </header>
    </div>
  );
}

export default App;
