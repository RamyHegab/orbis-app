import { supabase } from './supabase'
export async function getTrips() {
  const { data, error } = await supabase
    .from('trips')
    .select('*, trip_days(*, activities(*)), trip_checklist(*)')
    .order('created_at', { ascending: false })
  return { data, error }
}
export async function createTrip(trip) {
  const { data, error } = await supabase.from('trips').insert(trip).select().single()
  return { data, error }
}
export async function updateTrip(id, updates) {
  const { data, error } = await supabase.from('trips').update(updates).eq('id', id).select().single()
  return { data, error }
}
