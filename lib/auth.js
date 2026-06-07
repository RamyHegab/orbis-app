import { supabase } from './supabase'
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}
export async function signOut() {
  await supabase.auth.signOut()
}
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase
    .from('users')
    .select('*, universities(*)')
    .eq('id', user.id)
    .single()
  return { ...user, profile }
}
