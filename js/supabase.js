/* === HOTEL CEMAR - SUPABASE CLIENT === */

const SUPABASE_URL = window.ENV?.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY || '';

let supabaseClient = null;

function getSupabase() {
  if (supabaseClient) return supabaseClient;

  if (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true },
    });
  }
  return supabaseClient;
}

async function fetchRooms(lang = 'es') {
  try {
    const res = await fetch('/api/rooms');
    const rooms = await res.json();
    return rooms.map(r => ({
      ...r,
      name: r[`name_${lang}`],
      desc: r[`desc_${lang}`],
      amenities: r[`amenities_${lang}`],
    }));
  } catch {
    return null;
  }
}

async function createReservation(data) {
  const res = await fetch('/api/create-reservation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function subscribeNewsletter(email, lang = 'es') {
  const client = getSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('newsletter')
    .insert({ email, lang })
    .select();

  return { data, error };
}

// === AUTH & PROFILES ===
async function signInWithEmail(email, password) {
  const client = getSupabase();
  if (!client) return { error: 'Supabase not configured' };
  return client.auth.signInWithPassword({ email, password });
}

async function signUpWithEmail(email, password, fullName) {
  const client = getSupabase();
  if (!client) return { error: 'Supabase not configured' };
  return client.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
}

async function signOut() {
  const client = getSupabase();
  if (!client) return { error: 'Supabase not configured' };
  return client.auth.signOut();
}

async function getSession() {
  const client = getSupabase();
  if (!client) return null;
  const { data: { session } } = await client.auth.getSession();
  return session;
}

async function getUserProfile(userId) {
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

async function getCurrentUserRole() {
  const session = await getSession();
  if (!session?.user) return 'guest';
  const profile = await getUserProfile(session.user.id);
  return profile?.role || 'guest';
}

async function saveConversation(sessionId, userMessage, aiResponse, agentUsed, lang) {
  const client = getSupabase();
  if (!client) return { error: 'Supabase not configured' };

  const { data, error } = await client
    .from('ai_conversations')
    .insert({
      session_id: sessionId,
      user_message: userMessage,
      ai_response: aiResponse,
      agent_used: agentUsed,
      lang: lang
    })
    .select();

  return { data, error };
}

async function getConversationHistory(sessionId, limit = 20) {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('ai_conversations')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return null;
  return data?.reverse() || [];
}

// Attach to window for global access (no ES modules)
window.SupabaseAPI = {
  getSupabase,
  fetchRooms,
  createReservation,
  subscribeNewsletter,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  getSession,
  getUserProfile,
  getCurrentUserRole,
  onAuthStateChange,
  saveConversation,
  getConversationHistory
};
