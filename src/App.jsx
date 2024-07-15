import axios from 'axios';
import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [tokenInformation, setTokenInformation] = useState(null);

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  async function getTokenInformation(address) {
    try {
      const res = await axios.get(`http://localhost:3000?address=${address}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async function requestTokenInformation(e) {
    e.preventDefault();
    const tokenAddress = inputValue.trim();
    const resTokenInformation = await getTokenInformation(tokenAddress);
    setTokenInformation(resTokenInformation);
  }

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={requestTokenInformation}
        >
          <input onChange={handleInputChange} value={inputValue} />
          <button type='submir'>Check ERC20 Token Information</button>
        </form>
        {tokenInformation ? (
          <ul style={{ display: 'flex', flexDirection: 'column' }}>
            <li>{tokenInformation.name}</li>
            <li>{tokenInformation.symbol}</li>
            <li>{tokenInformation.totalSupply}</li>
          </ul>
        ) : null}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
