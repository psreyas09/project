import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setScript('');
    setAudioUrl('');
    // Replace with your backend endpoint
    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });
    const data = await response.json();
    setScript(data.script);
    setAudioUrl(data.audioUrl);
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Podcast Generator</h1>
        <input
          type="text"
          placeholder="Enter podcast topic"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          style={{ width: '80%', padding: 8, fontSize: 16 }}
        />
        <button onClick={handleGenerate} disabled={loading || !topic} style={{ marginLeft: 10, padding: 8 }}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
        {script && (
          <div style={{ marginTop: 30 }}>
            <h2>Podcast Script</h2>
            <textarea value={script} readOnly rows={12} style={{ width: '100%', fontSize: 15 }} />
          </div>
        )}
        {audioUrl && (
          <div style={{ marginTop: 20 }}>
            <h2>Podcast Audio</h2>
            <audio controls src={audioUrl} style={{ width: '100%' }} />
            <br />
            <a href={audioUrl} download="podcast.mp3">Download Audio</a>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
