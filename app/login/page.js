'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '../../lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error } = await signIn(email, password)
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--cream)',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <div style={{
        background: 'var(--white)', border: '1px solid var(--border)',
        borderRadius: 16, padding: '40px 36px', width: 400,
        boxShadow: '0 8px 40px rgba(44,24,16,0.1)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 36, fontWeight: 700, color: 'var(--brown)'
          }}>Orbis</div>
          <div style={{
            fontSize: 11, letterSpacing: 4, textTransform: 'uppercase',
            color: 'var(--teal)', marginTop: 4, fontWeight: 500
          }}>The IO Buddy</div>
          <div style={{ fontSize: 12, color: 'var(--brown4)', marginTop: 4 }}>
            International Office CRM
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: 'block', fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: 1,
              color: 'var(--brown3)', marginBottom: 6
            }}>Email</label>
            <input
              type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@university.ac.uk"
              required
              style={{
                width: '100%', padding: '10px 12px',
                border: '1.5px solid var(--border)', borderRadius: 8,
                fontSize: 13, color: 'var(--brown)', background: 'var(--cream)',
                outline: 'none', fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block', fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: 1,
              color: 'var(--brown3)', marginBottom: 6
            }}>Password</label>
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%', padding: '10px 12px',
                border: '1.5px solid var(--border)', borderRadius: 8,
                fontSize: 13, color: 'var(--brown)', background: 'var(--cream)',
                outline: 'none', fontFamily: 'inherit'
              }}
            />
          </div>

          {error && (
            <div style={{
              background: '#fdf0ee', border: '1px solid #e8a0a0',
              borderRadius: 8, padding: '10px 12px', fontSize: 12,
              color: '#b03a2e', marginBottom: 16
            }}>{error}</div>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '12px',
              background: loading ? 'var(--brown3)' : 'var(--forest)',
              color: '#f2e4d0', border: 'none', borderRadius: 8,
              fontSize: 14, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
              fontFamily: 'inherit', transition: 'all 0.15s'
            }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <div style={{
          marginTop: 24, textAlign: 'center',
          fontSize: 11, color: 'var(--brown4)'
        }}>
          Orbis · The IO Buddy · © 2026
        </div>
      </div>
    </div>
  )
}
