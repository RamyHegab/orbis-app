'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, getUser, signOut } from '../../lib/auth'
import { getAgents } from '../../lib/agents'
import { getTrips } from '../../lib/trips'
import { getForms } from '../../lib/forms'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({ agents: 0, trips: 0, forms: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const session = await getSession()
      if (!session) { router.push('/login'); return }
      const userData = await getUser()
      setUser(userData)
      const [{ data: agents }, { data: trips }, { data: forms }] = await Promise.all([
        getAgents(), getTrips(), getForms()
      ])
      setStats({
        agents: agents?.length || 0,
        trips: trips?.length || 0,
        forms: forms?.length || 0,
      })
      setLoading(false)
    }
    load()
  }, [])

  async function handleSignOut() {
    await signOut()
    router.push('/login')
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--cream)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Georgia,serif', fontSize: 32, color: 'var(--brown)', marginBottom: 8 }}>Orbis</div>
        <div style={{ fontSize: 13, color: 'var(--brown3)' }}>Loading your workspace…</div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', fontFamily: "'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>

      {/* Topbar */}
      <div style={{
        background: 'var(--white)', borderBottom: '1px solid var(--border)',
        padding: '0 32px', height: 58, display: 'flex', alignItems: 'center', gap: 16
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: 'var(--brown)' }}>
          Orbis
        </div>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 500 }}>
          The IO Buddy
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--brown3)' }}>
            {user?.profile?.full_name || user?.email}
          </span>
          <button
            onClick={handleSignOut}
            style={{
              padding: '6px 14px', borderRadius: 7, border: '1.5px solid var(--border)',
              background: 'transparent', fontSize: 12, color: 'var(--brown3)',
              cursor: 'pointer', fontFamily: 'inherit'
            }}
          >Sign out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ padding: '36px 40px', maxWidth: 1100, margin: '0 auto' }}>

        {/* Greeting */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 3, color: 'var(--brown4)', marginBottom: 4 }}>
            Welcome back
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 700, color: 'var(--brown)' }}>
            {user?.profile?.full_name?.split(' ')[0] || 'Hello'} 👋
          </div>
          <div style={{ fontSize: 13, color: 'var(--brown3)', marginTop: 6 }}>
            {user?.profile?.universities?.name || 'Your university'} · International Office CRM
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 36 }}>
          {[
            { label: 'Active Agents', value: stats.agents, color: 'var(--teal)', icon: '🏢' },
            { label: 'Trips', value: stats.trips, color: 'var(--terra)', icon: '✈️' },
            { label: 'Forms', value: stats.forms, color: 'var(--gold)', icon: '📋' },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, background: 'var(--white)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: s.color + '18', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 18
              }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: s.color }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: 'var(--brown4)', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2.5, color: 'var(--brown4)', fontWeight: 600, marginBottom: 16 }}>
          Quick Access
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { title: 'Agent Database', desc: 'View and manage all contracted agents', icon: '🏢', color: 'var(--teal)', href: '/agents' },
            { title: 'Plan a Trip', desc: 'Build itineraries and schedule visits', icon: '✈️', color: 'var(--terra)', href: '/itinerary' },
            { title: 'Forms', desc: 'Lead capture forms for fairs and visits', icon: '📋', color: 'var(--gold)', href: '/forms' },
          ].map(card => (
            <a key={card.title} href={card.href} style={{
              background: 'var(--white)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '20px', textDecoration: 'none',
              display: 'block', transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,24,16,0.09)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 700, color: 'var(--brown)', marginBottom: 6 }}>
                {card.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--brown3)', lineHeight: 1.5 }}>
                {card.desc}
              </div>
              <div style={{ marginTop: 14, fontSize: 12, fontWeight: 600, color: card.color }}>
                Open →
              </div>
            </a>
          ))}
        </div>

        {/* Notice */}
        <div style={{
          marginTop: 32, padding: '14px 18px',
          background: 'var(--teal-bg)', border: '1px solid var(--teal3)',
          borderRadius: 10, fontSize: 12, color: 'var(--teal)'
        }}>
          ✦ <strong>Connected to Supabase</strong> — Your data is live and secure.
          All changes save automatically and are isolated to your university.
        </div>
      </div>
    </div>
  )
}
