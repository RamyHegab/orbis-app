'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '../../lib/auth'

export default function MailPage() {
  const router = useRouter()
  useEffect(() => { getSession().then(s => { if (!s) router.push('/login') }) }, [])
  return (
    <div style={{ padding: 40, fontFamily: "'DM Sans',sans-serif" }}>
      <a href="/dashboard" style={{ color: 'var(--teal)', fontSize: 13 }}>← Dashboard</a>
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, marginTop: 16 }}>Mailing</h1>
      <p style={{ color: 'var(--brown3)', marginTop: 8 }}>Coming in the next update.</p>
    </div>
  )
}
