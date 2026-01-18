import { useState } from 'react'
import axios from 'axios'
import UrlShortener from './components/UrlShortener'
import RedditDiscovery from './components/RedditDiscovery'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('reddit')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const handleHealthCheck = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await axios.get('http://localhost:3000/api/health')
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (activeTab === 'reddit') {
    return <RedditDiscovery />
  }

  return (
    <div className="App">
      <div style={{ padding: '1rem', background: '#667eea', color: 'white', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('reddit')}
          style={{ 
            padding: '0.5rem 1rem', 
            marginRight: '0.5rem',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Reddit Discovery
        </button>
      </div>

      <h1>Hello from React</h1>
      
      <UrlShortener />

      <div style={{ marginTop: '3rem', padding: '1rem' }}>
        <p>Click the button to run health checks on your local Node API.</p>
        <button onClick={handleHealthCheck} disabled={loading}>
          {loading ? 'Checking...' : 'Run health check'}
        </button>

        {error && (
          <p style={{ color: 'red', marginTop: '1rem' }}>
            Error: {error}
          </p>
        )}

        {result && (
          <pre style={{ textAlign: 'left', marginTop: '1rem' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}

export default App
