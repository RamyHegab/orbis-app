'use client'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function Sidebar({ user, agentCount }) {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: '🏠', label: 'Home' },
    { href: '/agents', icon: '🏢', label: 'Agent Database', badge: agentCount },
    { href: '/schools', icon: '🎓', label: 'Schools' },
    { href: '/itinerary', icon: '✈️', label: 'Plan a Trip' },
    { href: '/forms', icon: '📋', label: 'Forms' },
  ]

  return (
    <aside className="sidebar">
      <div className="slogo">
        <div className="lw">Orbis</div>
        <div className="ls">The IO Buddy</div>
        <div className="lt">International Office CRM</div>
      </div>
      <nav className="snav">
        <div className="ng">Workspace</div>
        {navItems.map(item => (
          <a key={item.href} href={item.href} className={`nb ${pathname === item.href ? 'active' : ''}`}>
            <span className="ni">{item.icon}</span>
            {item.label}
            {item.badge ? <span className="nbadge">{item.badge}</span> : null}
          </a>
        ))}
        <div className="ndiv"></div>
        <div className="ng">Comms</div>
        <a href="/mail" className={`nb ${pathname === '/mail' ? 'active' : ''}`}><span className="ni">✉️</span>Mailing</a>
        <a href="/notes" className={`nb ${pathname === '/notes' ? 'active' : ''}`}><span className="ni">📝</span>Visit Notes</a>
        <div className="ndiv"></div>
        <div className="ng">Coming Soon</div>
        <button className="nb dim"><span className="ni">✨</span>AI Reports</button>
        <button className="nb dim"><span className="ni">📊</span>Performance</button>
        <div className="ndiv"></div>
        <button className="nb dim"><span className="ni">⚙️</span>Settings</button>
      </nav>
      <div className="suser">
        <div className="uav">{user?.full_name?.substring(0,2) || 'RH'}</div>
        <div>
          <div className="uname">{user?.full_name || 'User'}</div>
          <div className="urole">{user?.role || 'Officer'}</div>
        </div>
      </div>
    </aside>
  )
}
