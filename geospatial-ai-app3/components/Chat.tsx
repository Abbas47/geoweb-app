import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleQuery = async () => {
    const res = await axios.post('/api/duckdb', {
      operation: input,
    });
    setResponse(JSON.stringify(res.data, null, 2));
  };

  return (
    <div>
      <h2>Chat Interface</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your query"
        style={{ width: '300px', padding: '10px', margin: '10px 0' }}
      />
      <button onClick={handleQuery} style={{ padding: '10px' }}>
        Submit
      </button>
      <pre style={{ background: '#f4f4f4', padding: '10px' }}>{response}</pre>
    </div>
  );
}