import { supabase } from './supabase'
export async function getForms() {
  const { data, error } = await supabase
    .from('forms').select('*, form_entries(*)').order('created_at', { ascending: false })
  return { data, error }
}
export async function createForm(form) {
  const { data, error } = await supabase.from('forms').insert(form).select().single()
  return { data, error }
}
export async function addFormEntry(entry) {
  const { data, error } = await supabase.from('form_entries').insert(entry).select().single()
  return { data, error }
}
