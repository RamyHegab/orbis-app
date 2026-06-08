'use client'
import { usePathname } from 'next/navigation'
export default function Sidebar({ user, agentCount }) {
  const pathname = usePathname()
  const nav = [
    { href:'/dashboard', icon:'🏠', label:'Home' },
    { href:'/agents', icon:'🏢', label:'Agent Database', badge:agentCount },
    { href:'/schools', icon:'🎓', label:'Schools' },
    { href:'/itinerary', icon:'✈️', label:'Plan a Trip' },
    { href:'/forms', icon:'📋', label:'Forms' },
  ]
  const comms = [
    { href:'/mail', icon:'✉️', label:'Mailing' },
    { href:'/notes', icon:'📝', label:'Visit Notes' },
  ]
  return (
    <aside className='sidebar'>
      <div className='slogo'>
        <div className='lw'>Orbis</div>
        <div className='ls'>The IO Buddy</div>
        <div className='lt'>International Office CRM</div>
      </div>
      <nav className='snav'>
        <div className='ng'>Workspace</div>
        {nav.map(item=>(
          <a key={item.href} href={item.href} className={'nb'+(pathname===item.href?' active':'')}>
            <span className='ni'>{item.icon}</span>{item.label}
            {item.badge?<span className='nbadge'>{item.badge}</span>:null}
          </a>
        ))}
        <div className='ndiv'></div>
        <div className='ng'>Comms</div>
        {comms.map(item=>(
          <a key={item.href} href={item.href} className={'nb'+(pathname===item.href?' active':'')}>
            <span className='ni'>{item.icon}</span>{item.label}
          </a>
        ))}
        <div className='ndiv'></div>
        <div className='ng'>Coming Soon</div>
        <button className='nb dim'><span className='ni'>✨</span>AI Reports</button>
        <button className='nb dim'><span className='ni'>📊</span>Performance</button>
        <div className='ndiv'></div>
        <button className='nb dim'><span className='ni'>⚙️</span>Settings</button>
      </nav>
      <div className='suser'>
        <div className='uav'>{user?.full_name?.substring(0,2)||'RH'}</div>
        <div>
          <div className='uname'>{user?.full_name||'User'}</div>
          <div className='urole'>{user?.role||'Officer'}</div>
        </div>
      </div>
    </aside>
  )
}
