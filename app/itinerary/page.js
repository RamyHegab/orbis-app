'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '../../lib/auth'

export default function ItineraryPage() {
  const router = useRouter()
  useEffect(() => {
    getSession().then(s => { if (!s) router.push('/login') })
  }, [])
  return (
    <div style={{ padding: 40, fontFamily: "'DM Sans',sans-serif" }}>
      <a href="/dashboard" style={{ color: 'var(--teal)', fontSize: 13 }}>← Dashboard</a>
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, marginTop: 16, marginBottom: 8 }}>Plan a Trip</h1>
      <p style={{ color: 'var(--brown3)', marginBottom: 32 }}>Full itinerary planner coming in the next update.</p>
      <div style={{ background: 'var(--teal-bg)', border: '1px solid var(--teal3)', borderRadius: 10, padding: '16px 20px', fontSize: 13, color: 'var(--teal)' }}>
        ✦ For now use the prototype HTML file for full itinerary planning — this page will be fully connected in Step 5 of the build.
      </div>
    </div>
  )
}
