const { getSupabaseAdmin, handleOptions, jsonResponse, errorResponse } = require('./_lib');

const ROOM_PRICES = { double: 75, twin: 65, family: 95 };

export default async function handler(request) {
  const options = handleOptions(request);
  if (options) return options;

  if (request.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  try {
    const body = await request.json();
    const { room_slug, check_in, check_out, guests, full_name, email, phone, extras } = body;

    if (!room_slug || !check_in || !check_out || !full_name || !email || !phone) {
      return errorResponse('Missing required fields');
    }

    const nights = Math.ceil(
      (new Date(check_out) - new Date(check_in)) / (1000 * 60 * 60 * 24)
    );
    if (nights <= 0) return errorResponse('Invalid dates');

    const supabase = getSupabaseAdmin();

    const { data: room } = await supabase
      .from('rooms')
      .select('id, base_price')
      .eq('slug', room_slug)
      .single();

    if (!room) return errorResponse('Room not found', 404);

    const total_amount = room.base_price * nights;

    const { data: reservation, error } = await supabase
      .from('reservations')
      .insert({
        room_id: room.id,
        check_in,
        check_out,
        guests: parseInt(guests) || 1,
        full_name,
        email,
        phone,
        extras: extras || null,
        total_amount,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    return jsonResponse({
      id: reservation.id,
      total_amount,
      currency: 'EUR',
      nights,
      room_slug,
      status: 'pending',
    }, 201);
  } catch (err) {
    return errorResponse(err.message, 500);
  }
}
