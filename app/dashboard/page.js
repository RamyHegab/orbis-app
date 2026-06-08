'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState({ agents: 0, trips: 0, forms: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      setUser(session.user)
      const { data: profileData } = await supabase
        .from('users')
        .select('full_name, role, universities(name)')
        .eq('id', session.user.id)
        .maybeSingle()
      if (profileData) setProfile(profileData)
      const [{ count: ac }, { count: tc }, { count: fc }] = await Promise.all([
        supabase.from('agents').select('*', { count: 'exact', head: true }),
        supabase.from('trips').select('*', { count: 'exact', head: true }),
        supabase.from('forms').select('*', { count: 'exact', head: true }),
      ])
      setStats({ agents: ac || 0, trips: tc || 0, forms: fc || 0 })
      setLoading(false)
    }
    load()
  }, [])

  const firstName = profile?.full_name || user?.email?.split('@')[0] || 'there'

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}><div style={{textAlign:'center'}}><div style={{fontFamily:"Georgia,serif",fontSize:32,color:'#2c1810',marginBottom:8}}>Orbis</div><div style={{fontSize:13,color:'#8a5c3c'}}>Loading…</div></div></div>

  return (
    <div style={{minHeight:'100vh',background:'#f5ede0',fontFamily:"sans-serif"}}>
      <div style={{background:'#fdf8f2',borderBottom:'1px solid #d8c4a8',padding:'0 32px',height:58,display:'flex',alignItems:'center',gap:16}}>
        <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:'#2c1810'}}>Orbis</div>
        <div style={{fontSize:10,letterSpacing:3,textTransform:'uppercase',color:'#2d7a6e',fontWeight:500}}>The IO Buddy</div>
        <div style={{marginLeft:'auto',display:'flex',gap:12,alignItems:'center'}}>
          <span style={{fontSize:12,color:'#8a5c3c'}}>{profile?.full_name || user?.email}</span>
          <button onClick={()=>{supabase.auth.signOut();router.push('/login')}} style={{padding:'6px 14px',borderRadius:7,border:'1.5px solid #d8c4a8',background:'transparent',fontSize:12,color:'#8a5c3c',cursor:'pointer'}}>Sign out</button>
        </div>
      </div>
      <div style={{padding:'36px 40px',maxWidth:1100,margin:'0 auto'}}>
        <div style={{marginBottom:32}}>
          <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:3,color:'#b8896a',marginBottom:4}}>Welcome back</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:36,fontWeight:700,color:'#2c1810'}}>Good to see you, {firstName} 👋</div>
          <div style={{fontSize:13,color:'#8a5c3c',marginTop:6}}>{profile?.universities?.name || 'International Office'} · Orbis CRM</div>
        </div>
        <div style={{display:'flex',gap:14,marginBottom:36}}>
          {[{label:'Agents',value:stats.agents,color:'#2d7a6e',icon:'🏢'},{label:'Trips',value:stats.trips,color:'#c8703a',icon:'✈️'},{label:'Forms',value:stats.forms,color:'#c8940a',icon:'📋'}].map(s=>(
            <div key={s.label} style={{flex:1,background:'#fdf8f2',border:'1px solid #d8c4a8',borderRadius:12,padding:'16px 20px',display:'flex',alignItems:'center',gap:14}}>
              <div style={{width:40,height:40,borderRadius:10,background:s.color+'22',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>{s.icon}</div>
              <div><div style={{fontFamily:"Georgia,serif",fontSize:26,fontWeight:700,color:s.color}}>{s.value}</div><div style={{fontSize:11,color:'#b8896a',textTransform:'uppercase',letterSpacing:0.8}}>{s.label}</div></div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
          {[{title:'Agent Database',desc:'View and manage all contracted agents',icon:'🏢',color:'#2d7a6e',href:'/agents'},{title:'Plan a Trip',desc:'Build itineraries and schedule visits',icon:'✈️',color:'#c8703a',href:'/itinerary'},{title:'Forms',desc:'Lead capture forms for fairs and visits',icon:'📋',color:'#c8940a',href:'/forms'}].map(card=>(
            <a key={card.title} href={card.href} style={{background:'#fdf8f2',border:'1px solid #d8c4a8',borderRadius:14,padding:'20px',textDecoration:'none',display:'block'}}>
              <div style={{fontSize:28,marginBottom:12}}>{card.icon}</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,color:'#2c1810',marginBottom:6}}>{card.title}</div>
              <div style={{fontSize:12,color:'#8a5c3c',lineHeight:1.5}}>{card.desc}</div>
              <div style={{marginTop:14,fontSize:12,fontWeight:600,color:card.color}}>Open →</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
