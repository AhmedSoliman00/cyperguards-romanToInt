import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [roman, setRoman] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('convert')
  const [conversions, setConversions] = useState([])
  const [selectedConversion, setSelectedConversion] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editRoman, setEditRoman] = useState('')
  const [searchId, setSearchId] = useState('')

  const API_BASE = 'http://localhost:5000/api'

  // Ensure background is applied properly
  useEffect(() => {
    // Apply background styles directly to body
    document.body.style.background =
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundSize = '400% 400%'
    document.body.style.animation = 'gradientShift 15s ease infinite'
    document.body.style.minHeight = '100vh'

    // Cleanup function
    return () => {
      document.body.style.background = ''
      document.body.style.backgroundAttachment = ''
      document.body.style.backgroundSize = ''
      document.body.style.animation = ''
      document.body.style.minHeight = ''
    }
  }, [])

  // Fetch all conversions
  const fetchAllConversions = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/conversions`)
      const data = await res.json()
      if (data.success) {
        setConversions(data.data)
      }
    } catch (err) {
      setError('Failed to fetch conversions')
    } finally {
      setLoading(false)
    }
  }

  // Convert Roman numeral
  const handleConvert = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch(`${API_BASE}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numeral: roman }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Invalid Roman numeral format')
      }

      setResult(data)
      // Refresh conversions list if we're on that tab
      if (activeTab === 'list') {
        fetchAllConversions()
      }
    } catch (err) {
      setError(err.message || 'Invalid Roman numeral format')
    } finally {
      setLoading(false)
    }
  }

  // Get conversion by ID
  const handleGetById = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSelectedConversion(null)

    try {
      const res = await fetch(`${API_BASE}/conversions/${searchId}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Conversion not found')
      }

      setSelectedConversion(data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Update conversion
  const handleUpdate = async (id, newRoman) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/conversions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roman: newRoman }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update')
      }

      setEditingId(null)
      setEditRoman('')
      fetchAllConversions()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Delete conversion
  const handleDelete = async (id) => {
  
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/conversions/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete')
      }

      fetchAllConversions()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Clear form
  const handleClear = () => {
    setRoman('')
    setResult(null)
    setError('')
    setSearchId('')
    setSelectedConversion(null)
  }

  // Load conversions when switching to list tab
  useEffect(() => {
    if (activeTab === 'list') {
      fetchAllConversions()
    }
  }, [activeTab])

  return (
    <div className='app'>
      <div className='background-pattern'></div>
      <div className='container'>
        <header className='header'>
          <h1> -- Roman Numeral Converter --</h1>
          <p>By Ahmed Soliman and Alaa Fawzy</p>
          <p>Convert Roman numerals to integers and manage your conversions</p>
        </header>

        <nav className='tabs'>
          <button
            className={`tab ${activeTab === 'convert' ? 'active' : ''}`}
            onClick={() => setActiveTab('convert')}
          >
            Convert
          </button>
          <button
            className={`tab ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            Search by ID
          </button>
          <button
            className={`tab ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            All Conversions
          </button>
        </nav>

        <main className='content'>
          {/* Convert Tab */}
          {activeTab === 'convert' && (
            <div className='card'>
              <h2>Convert Roman Numeral</h2>
              <form onSubmit={handleConvert}>
                <input
                  type='text'
                  placeholder='Enter Roman Numeral (e.g., XIV, MCMXC)'
                  value={roman}
                  onChange={(e) => setRoman(e.target.value.toUpperCase())}
                  required
                />
                <div className='button-group'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='btn primary'
                  >
                    {loading ? 'Converting...' : 'Convert'}
                  </button>
                  <button
                    type='button'
                    onClick={handleClear}
                    className='btn secondary'
                  >
                    Clear
                  </button>
                </div>
              </form>

              {result && (
                <div className='result-card success'>
                  <h3>✅ Conversion Result</h3>
                  <div className='result-details'>
                    <p>
                      <strong>Roman:</strong> {result.roman}
                    </p>
                    <p>
                      <strong>Integer:</strong> {result.integer}
                    </p>
                    <p>
                      <strong>ID:</strong> {result.id}
                    </p>
                    <p>
                      <strong>Created:</strong>{' '}
                      {new Date(result.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Search by ID Tab */}
          {activeTab === 'search' && (
            <div className='card'>
              <h2>Search Conversion by ID</h2>
              <form onSubmit={handleGetById}>
                <input
                  type='text'
                  placeholder='Enter Conversion ID'
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  required
                />
                <div className='button-group'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='btn primary'
                  >
                    {loading ? 'Searching...' : 'Search'}
                  </button>
                  <button
                    type='button'
                    onClick={handleClear}
                    className='btn secondary'
                  >
                    Clear
                  </button>
                </div>
              </form>

              {selectedConversion && (
                <div className='result-card success'>
                  <h3>🔍 Found Conversion</h3>
                  <div className='result-details'>
                    <p>
                      <strong>ID:</strong> {selectedConversion._id}
                    </p>
                    <p>
                      <strong>Roman:</strong> {selectedConversion.roman}
                    </p>
                    <p>
                      <strong>Integer:</strong> {selectedConversion.integer}
                    </p>
                    <p>
                      <strong>Created:</strong>{' '}
                      {new Date(selectedConversion.createdAt).toLocaleString()}
                    </p>
                    {selectedConversion.updatedAt &&
                      selectedConversion.updatedAt !==
                        selectedConversion.createdAt && (
                        <p>
                          <strong>Updated:</strong>{' '}
                          {new Date(
                            selectedConversion.updatedAt
                          ).toLocaleString()}
                        </p>
                      )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* All Conversions Tab */}
          {activeTab === 'list' && (
            <div className='card'>
              <div className='list-header'>
                <h2>All Conversions</h2>
                <button
                  onClick={fetchAllConversions}
                  className='btn secondary'
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>

              {conversions.length === 0 ? (
                <div className='empty-state'>
                  <p>
                    No conversions found. Start by converting some Roman
                    numerals!
                  </p>
                </div>
              ) : (
                <div className='conversions-grid'>
                  {conversions.map((conversion) => (
                    <div key={conversion._id} className='conversion-item'>
                      <div className='conversion-content'>
                        {editingId === conversion._id ? (
                          <div className='edit-form'>
                            <input
                              type='text'
                              value={editRoman}
                              onChange={(e) =>
                                setEditRoman(e.target.value.toUpperCase())
                              }
                              placeholder='Enter new Roman numeral'
                            />
                            <div className='edit-actions'>
                              <button
                                onClick={() =>
                                  handleUpdate(conversion._id, editRoman)
                                }
                                className='btn primary small'
                                disabled={loading}
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className='btn secondary small'
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className='conversion-info'>
                              <h4>
                                {conversion.roman} = {conversion.integer}
                              </h4>
                              <p className='conversion-meta'>
                                ID: {conversion._id}
                              </p>
                              <p className='conversion-meta'>
                                Created:{' '}
                                {new Date(
                                  conversion.createdAt
                                ).toLocaleString()}
                              </p>
                              {conversion.updatedAt &&
                                conversion.updatedAt !==
                                  conversion.createdAt && (
                                  <p className='conversion-meta'>
                                    Updated:{' '}
                                    {new Date(
                                      conversion.updatedAt
                                    ).toLocaleString()}
                                  </p>
                                )}
                            </div>
                            <div className='conversion-actions'>
                              <button
                                onClick={() => {
                                  setEditingId(conversion._id)
                                  setEditRoman(conversion.roman)
                                }}
                                className='btn secondary small'
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(conversion._id)}
                                className='btn danger small'
                                disabled={loading}
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className='result-card error'>
              <h3>❌ Error</h3>
              <p>{error}</p>
              <button
                onClick={() => setError('')}
                className='btn secondary small'
              >
                Dismiss
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
