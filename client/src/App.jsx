import { useState } from 'react';
import './App.css'

function App(){
  const [roman, setRoman] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 
    setResult(null);
 
  try {
      const res = await fetch('http://localhost:5000/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numeral: roman }),
      });

 const data = await res.json();

 if (!res.ok) {
        throw new Error(data.message || 'Invalid Roman numeral format');
      }

      setResult(data.integer);
    } catch (err) {
     console.error(err);
     if (err.message === 'Failed to fetch') {
        setError('❌ Sorry, something went wrong. Please try again later');
    } else {
        setError(err.message || 'Invalid Roman numeral format');
    }

    } finally {
      setLoading(false);
    }
  };

   const handleClear = () => {
    setRoman('');
    setResult(null);
    setError('');
  };

return(
<div className='wrapper'>
  <div className='card'>
    <h1>🔢 Roman To Integer</h1>
    <form onSubmit={handleConvert}>
        <input
        type="text"
        placeholder='Enter Roman Numeral'
        value={roman}
        onChange={(e)=> setRoman(e.target.value.toUpperCase())}
        required
        />
        <button type='submit' disabled={loading} className='btn convert-btn'>
         {loading ? 'Converting...' : 'Convert'}
        </button>
    </form>
    <button type="button" onClick={handleClear} className='btn clear-btn'>
      Clear
    </button>

    {result !==null && <p className='result'> ✅ Result : {result}</p>}
    {error && <p className='error'>{error}</p>}
  </div>
</div>
);
}
export default App;
