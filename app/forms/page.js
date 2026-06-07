'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '../../lib/auth'
import { getForms } from '../../lib/forms'

export default function FormsPage() {
  const router = useRouter()
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const session = await getSession()
      if (!session) { router.push('/login'); return }
      const { data } = await getForms()
      setForms(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div style={{ padding: 40 }}>Loading forms…</div>

  return (
    <div style={{ padding: 40, fontFamily: "'DM Sans',sans-serif", maxWidth: 900 }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <a href="/dashboard" style={{ color: 'var(--teal)', fontSize: 13 }}>← Dashboard</a>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, color: 'var(--brown)' }}>Forms</h1>
      </div>
      {!forms.length ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'var(--white)', borderRadius: 14, border: '1px solid var(--border)', color: 'var(--brown4)' }}>
          <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>📋</div>
          <div style={{ fontSize: 14, fontStyle: 'italic' }}>No forms yet. Create one from the itinerary planner.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {forms.map(f => (
            <div key={f.id} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 11, color: 'var(--brown4)', marginBottom: 12 }}>
                {f.form_entries?.length || 0} entries · Created {new Date(f.created_at).toLocaleDateString('en-GB')}
              </div>
              <div style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600 }}>
                {f.form_entries?.length || 0} entries collected
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
