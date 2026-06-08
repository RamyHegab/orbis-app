'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      // Auth passed - redirect to full prototype app
      window.location.href = '/orbis_app.html'
    }
    check()
  }, [])

  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'center',
      height:'100vh', background:'#f5ede0', fontFamily:'Georgia,serif'
    }}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:32, color:'#2c1810', marginBottom:8}}>Orbis</div>
        <div style={{fontSize:13, color:'#8a5c3c'}}>Loading your workspace…</div>
      </div>
    </div>
  )
}
