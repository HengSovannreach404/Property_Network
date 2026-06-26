import { useState, useEffect } from 'react'
import api from '../../services/api'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/buyers/notifications')
      .then(res => setNotifications(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ padding: '40px' }}>Loading...</p>

  return (
    <div style={{ padding: '32px', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px' }}>Notifications</h2>
      {notifications.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No notifications.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map(n => (
            <div key={n.notif_id} style={{
              background: n.is_read ? '#fff' : '#eff6ff',
              border: `1px solid ${n.is_read ? '#e5e7eb' : '#bfdbfe'}`,
              borderRadius: '8px', padding: '16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <p style={{ fontWeight: n.is_read ? '400' : '600' }}>{n.message}</p>
                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{n.type}</p>
              </div>
              {!n.is_read && (
                <span style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: '#1a56db', flexShrink: 0
                }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notifications