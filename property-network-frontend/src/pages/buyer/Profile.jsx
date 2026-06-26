import { useState, useEffect } from 'react'
import api from '../../services/api'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get('/buyers/profile')
      .then(res => {
        setProfile(res.data.data)
        setFormData({ full_name: res.data.data.full_name, phone: res.data.data.phone || '' })
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    try {
      await api.put('/buyers/profile', formData)
      setProfile({ ...profile, ...formData })
      setEditing(false)
      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p style={{ padding: '40px' }}>Loading...</p>

  return (
    <div style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px' }}>My Profile</h2>
      {message && <p style={{ color: '#10b981', marginBottom: '16px' }}>{message}</p>}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px' }}>
        {!editing ? (
          <>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#6b7280', fontSize: '13px' }}>Full Name</p>
              <p style={{ fontWeight: '600', fontSize: '16px' }}>{profile?.full_name}</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#6b7280', fontSize: '13px' }}>Email</p>
              <p style={{ fontWeight: '600', fontSize: '16px' }}>{profile?.email}</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <p style={{ color: '#6b7280', fontSize: '13px' }}>Phone</p>
              <p style={{ fontWeight: '600', fontSize: '16px' }}>{profile?.phone || '—'}</p>
            </div>
            <button onClick={() => setEditing(true)} style={{
              padding: '10px 20px', background: '#1a56db', color: '#fff',
              border: 'none', borderRadius: '6px', fontWeight: '600'
            }}>Edit Profile</button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Full Name</label>
              <input value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '15px' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Phone</label>
              <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '15px' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleSave} style={{
                padding: '10px 20px', background: '#1a56db', color: '#fff',
                border: 'none', borderRadius: '6px', fontWeight: '600'
              }}>Save</button>
              <button onClick={() => setEditing(false)} style={{
                padding: '10px 20px', background: '#f3f4f6', color: '#374151',
                border: 'none', borderRadius: '6px', fontWeight: '600'
              }}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile