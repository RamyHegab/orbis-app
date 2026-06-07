import { supabase } from './supabase'
export async function getAgents() {
  const { data, error } = await supabase
    .from('agents')
    .select('*, agent_countries(country), contacts(*), branches(*)')
    .order('name')
  return { data, error }
}
export async function createAgent(agent) {
  const { data, error } = await supabase.from('agents').insert(agent).select().single()
  return { data, error }
}
export async function updateAgent(id, updates) {
  const { data, error } = await supabase.from('agents').update(updates).eq('id', id).select().single()
  return { data, error }
}
