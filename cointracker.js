import { useEffect, useState } from 'react';

function Inputs({ data }) {
  return (
    <select>
      {data.map((item) => (
        <option key={item.id}>{}</option>
      ))}
    </select>
  );
}

function App() {
  const [usd, setUsd] = useState('');
  // ''로 채우면 placeholder가 보임
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
      });
  }, []);
  const onChange = (event) => {
    setUsd(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setUsd('');
  };

  const onSelect = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>The Coins!{loading ? '' : `(${coins.length})`}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='USD'>USD:</label>
        <input
          value={usd}
          onChange={onChange}
          id='USD'
          type='number'
          placeholder='$USD'
        />
        <div>
          Coins:
          {loading ? <strong>Loading...</strong> : <Inputs data={coins} />}
        </div>
        <button>Convert</button>
      </form>
      Result
    </div>
  );
}

export default App;
