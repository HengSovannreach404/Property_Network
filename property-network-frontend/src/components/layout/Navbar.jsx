import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{
      background: '#fff', borderBottom: '1px solid #e5e7eb',
      padding: '0 32px', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      height: '64px', position: 'sticky', top: 0, zIndex: 100
    }}>
      <Link to="/" style={{ fontWeight: '800', fontSize: '20px', color: '#1a56db' }}>
        Property Network
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {user?.role === 'buyer' && (
          <>
            <Link to="/buyer" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Home</Link>
            <Link to="/buyer/saved" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Saved</Link>
            <Link to="/buyer/appointments" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Appointments</Link>
            <Link to="/buyer/messages" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Messages</Link>
            <Link to="/buyer/notifications" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Notifications</Link>
            <Link to="/buyer/profile" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Profile</Link>
          </>
        )}
        {user?.role === 'agent' && (
          <>
            <Link to="/agent" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Dashboard</Link>
            <Link to="/agent/listings" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Listings</Link>
            <Link to="/agent/appointments" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Appointments</Link>
            <Link to="/agent/messages" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Messages</Link>
            <Link to="/agent/profile" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Profile</Link>
          </>
        )}
        {user?.role === 'admin' && (
          <>
            <Link to="/admin" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Dashboard</Link>
            <Link to="/admin/users" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Users</Link>
            <Link to="/admin/listings" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Listings</Link>
            <Link to="/admin/reports" style={{ color: '#374151', fontWeight: '500', fontSize: '15px' }}>Reports</Link>
          </>
        )}
        {user && (
          <button onClick={handleLogout} style={{
            padding: '8px 18px', background: '#1a56db', color: '#fff',
            border: 'none', borderRadius: '6px', fontWeight: '600',
            fontSize: '14px', cursor: 'pointer'
          }}>Logout</button>
        )}
        {!user && (
          <Link to="/login" style={{
            padding: '8px 18px', background: '#1a56db', color: '#fff',
            borderRadius: '6px', fontWeight: '600', fontSize: '14px'
          }}>Sign In</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar