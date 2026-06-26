import { useState, useEffect } from 'react'
import api from '../../services/api'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/buyers/messages')
      .then(res => setMessages(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ padding: '40px' }}>Loading...</p>

  return (
    <div style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px' }}>Messages</h2>
      {messages.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No messages yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map(m => (
            <div key={m.message_id} style={{
              background: '#fff', border: '1px solid #e5e7eb',
              borderRadius: '8px', padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '600' }}>{m.Agent?.full_name}</span>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>{m.Agent?.agency_name}</span>
              </div>
              <p>{m.body}</p>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                {new Date(m.sent_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Messages