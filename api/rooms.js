const { getSupabaseAdmin, handleOptions, jsonResponse, errorResponse } = require('./_lib');

export default async function handler(request) {
  const options = handleOptions(request);
  if (options) return options;

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('active', true)
      .order('base_price');

    if (error) throw error;
    return jsonResponse(data);
  } catch (err) {
    return errorResponse(err.message, 500);
  }
}
