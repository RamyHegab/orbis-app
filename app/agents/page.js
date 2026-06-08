'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Page() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      setChecking(false)
    }
    check()
  }, [])

  if (checking) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#f5ede0',fontFamily:'Georgia,serif'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:32,color:'#2c1810',marginBottom:8}}>Orbis</div>
        <div style={{fontSize:13,color:'#8a5c3c'}}>Loading…</div>
      </div>
    </div>
  )

  return (
    <div style={{width:'100vw',height:'100vh',overflow:'hidden'}}>
      <iframe src="/orbis_app.html" style={{width:'100%',height:'100%',border:'none'}} title="Orbis CRM"/>
    </div>
  )
}
