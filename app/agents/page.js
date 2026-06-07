'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '../../lib/auth'
import { getAgents } from '../../lib/agents'

export default function AgentsPage() {
  const router = useRouter()
  const [agents, setAgents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    async function load() {
      const session = await getSession()
      if (!session) { router.push('/login'); return }
      const { data, error } = await getAgents()
      if (data) { setAgents(data); setFiltered(data) }
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(agents.filter(a =>
      !q || a.name?.toLowerCase().includes(q) ||
      a.code?.toLowerCase().includes(q) ||
      a.hq_country?.toLowerCase().includes(q) ||
      a.contacts?.some(c => c.full_name?.toLowerCase().includes(q))
    ))
  }, [search, agents])

  const tagStyle = (color, bg) => ({
    display: 'inline-flex', alignItems: 'center', padding: '2px 8px',
    borderRadius: 20, fontSize: 11, fontWeight: 600, color, background: bg, marginRight: 4
  })

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading agents…</div>

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'DM Sans',sans-serif", background: 'var(--cream)' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>

      {/* Sidebar list */}
      <div style={{ width: 320, background: 'var(--white)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <a href="/dashboard" style={{ fontSize: 12, color: 'var(--brown3)', textDecoration: 'none' }}>← Home</a>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--brown)' }}>Agent Database</span>
          </div>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search agents, codes, countries…"
            style={{
              width: '100%', padding: '8px 12px', borderRadius: 8,
              border: '1.5px solid var(--border)', fontSize: 12,
              background: 'var(--cream)', color: 'var(--brown)',
              outline: 'none', fontFamily: 'inherit'
            }}
          />
        </div>
        <div style={{ fontSize: 11, color: 'var(--brown4)', padding: '6px 14px', borderBottom: '1px solid var(--border)' }}>
          {filtered.length} agents
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(a => (
            <div key={a.id}
              onClick={() => { setSelected(a); setActiveTab('overview') }}
              style={{
                padding: '11px 14px', borderBottom: '1px solid var(--border)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                background: selected?.id === a.id ? 'var(--teal-bg)' : 'transparent',
                borderLeft: selected?.id === a.id ? '3px solid var(--teal)' : '3px solid transparent',
                transition: 'all 0.1s'
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 9, background: 'var(--cream2)',
                border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 12, fontWeight: 700,
                color: 'var(--brown2)', fontFamily: "'Cormorant Garamond',serif", flexShrink: 0
              }}>
                {a.name?.substring(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {a.name}
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--brown3)', marginTop: 1 }}>
                  {a.code} · {a.hq_country}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'var(--cream)' }}>
        {!selected ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--brown4)' }}>
            <div style={{ fontSize: 44, opacity: 0.25, marginBottom: 10 }}>🏢</div>
            <div style={{ fontSize: 13, fontStyle: 'italic' }}>Select an agent to view details</div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '18px 24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 700, color: 'var(--brown)' }}>
                  {selected.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--brown3)', marginTop: 3 }}>{selected.legal_name}</div>
                <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={tagStyle('var(--teal)', 'var(--teal-bg)')}>✓ Active</span>
                  <span style={tagStyle('var(--brown2)', 'var(--cream2)')}>📍 {selected.hq_country}</span>
                  {selected.code && <span style={tagStyle('var(--brown2)', 'var(--cream2)')}>{selected.code}</span>}
                  {selected.agreement_end && <span style={tagStyle('var(--brown2)', 'var(--cream2)')}>Until {selected.agreement_end}</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <a href="/itinerary" style={{
                  padding: '7px 14px', borderRadius: 8, background: 'var(--forest)',
                  color: '#f2e4d0', fontSize: 12, fontWeight: 600, textDecoration: 'none'
                }}>✈️ Plan Visit</a>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 24px' }}>
              {['overview', 'branches', 'contacts'].map(tab => (
                <button key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '10px 16px', fontSize: 12.5, fontWeight: activeTab === tab ? 600 : 500,
                    color: activeTab === tab ? 'var(--teal)' : 'var(--brown3)',
                    borderBottom: activeTab === tab ? '2px solid var(--teal)' : '2px solid transparent',
                    border: 'none', background: 'none', cursor: 'pointer', marginBottom: -1,
                    fontFamily: 'inherit', textTransform: 'capitalize'
                  }}
                >{tab}</button>
              ))}
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
              {activeTab === 'overview' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                    {[
                      { label: 'HQ Country', value: selected.hq_country },
                      { label: 'HQ City', value: selected.hq_city },
                      { label: 'Address', value: selected.hq_address, full: true },
                      { label: 'Agreement End', value: selected.agreement_end },
                      { label: 'Officer', value: selected.officer },
                    ].map(f => f.value && (
                      <div key={f.label} style={{
                        background: 'var(--white)', border: '1px solid var(--border)',
                        borderRadius: 9, padding: '12px', gridColumn: f.full ? '1/-1' : 'auto'
                      }}>
                        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--brown3)', marginBottom: 4 }}>{f.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{f.value}</div>
                      </div>
                    ))}
                  </div>
                  {selected.agent_countries?.length > 0 && (
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Cormorant Garamond',serif", marginBottom: 10 }}>
                        Countries of Operation
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {selected.agent_countries.map(c => (
                          <span key={c.country} style={{
                            padding: '3px 9px', borderRadius: 6, fontSize: 11,
                            background: 'var(--cream2)', color: 'var(--brown2)',
                            border: '1px solid var(--border)'
                          }}>🌐 {c.country}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'branches' && (
                <div>
                  {selected.branches?.length ? selected.branches.map(b => (
                    <div key={b.id} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', marginBottom: 10 }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{b.name || b.city}</div>
                      <div style={{ fontSize: 11, color: 'var(--brown3)', marginTop: 2 }}>📍 {b.city}, {b.country}</div>
                    </div>
                  )) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--brown4)', fontStyle: 'italic' }}>
                      No branches recorded
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'contacts' && (
                <div>
                  {selected.contacts?.length ? selected.contacts.map(c => (
                    <div key={c.id} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--cream2)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {c.full_name?.split(' ').map(w=>w[0]).join('').substring(0,2)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{c.full_name}</div>
                        <div style={{ fontSize: 11, color: 'var(--brown3)' }}>{c.role}</div>
                        {c.email && <div style={{ fontSize: 11, color: 'var(--teal)' }}>{c.email}</div>}
                        {c.phone && <div style={{ fontSize: 11, color: 'var(--brown3)' }}>{c.phone}</div>}
                        <div style={{ marginTop: 6, display: 'flex', gap: 4 }}>
                          {c.tags?.map(t => (
                            <span key={t} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 20, background: 'var(--teal-bg)', color: 'var(--teal)', fontWeight: 600 }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--brown4)', fontStyle: 'italic' }}>
                      No contacts recorded
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
