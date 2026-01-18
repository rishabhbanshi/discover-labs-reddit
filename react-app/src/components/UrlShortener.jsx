import { useState } from 'react'
import axios from 'axios'

function UrlShortener() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [shortUrl, setShortUrl] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    setLoading(true)
    setError(null)
    setShortUrl(null)

    try {
      const res = await axios.post('http://localhost:3000/api/shorten', {
        original_url: url.trim()
      })
      setShortUrl(res.data.short_url)
      setUrl('')
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to shorten URL')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    alert('Copied to clipboard!')
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to shorten"
            style={{
              flex: 1,
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </div>
      </form>

      {error && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#fee',
          color: '#c33',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {shortUrl && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#e8f5e9',
          borderRadius: '4px',
          border: '1px solid #4caf50'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Shortened URL:</p>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                color: '#007bff',
                textDecoration: 'none',
                wordBreak: 'break-all'
              }}
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UrlShortener

