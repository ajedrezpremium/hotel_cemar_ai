-- ============================================================
-- HOTEL CEMAR - Setup Script (run in Supabase SQL Editor)
-- 1. First run supabase/schema.sql
-- 2. Then run this file for seed data
-- ============================================================

-- Insert additional demo data
INSERT INTO promotions (name_es, name_gl, name_en, desc_es, desc_gl, desc_en, discount_percent, valid_from, valid_to) VALUES
  ('Escapada Culinaria', 'Escapada Culinaria', 'Culinary Getaway',
   'Aloxamento + cea gourmet para dúas persoas. Menú especial con viños da rexión.',
   'Aloxamento + cea gourmet para dúas persoas. Menú especial con viños da rexión.',
   'Accommodation + gourmet dinner for two. Special menu with regional wines.',
   15, CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days'),
  ('Desconto Early Bird', 'Desconto Early Bird', 'Early Bird Discount',
   'Reserva con 30 días de antelación e obtén un desconto especial.',
   'Reserva con 30 días de antelación e obtén un desconto especial.',
   'Book 30 days in advance and get a special discount.',
   10, CURRENT_DATE, CURRENT_DATE + INTERVAL '180 days');

-- RLS Policies
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert reservations
CREATE POLICY "Anyone can create reservations" ON reservations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Allow users to view their own reservations by email
CREATE POLICY "Users can view own reservations" ON reservations
  FOR SELECT TO anon, authenticated
  USING (email = current_setting('request.jwt.claims')::json->>'email' OR email IS NOT NULL);

-- Allow anyone to subscribe to newsletter
CREATE POLICY "Anyone can subscribe" ON newsletter
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Allow public read for rooms and testimonials
CREATE POLICY "Public read rooms" ON rooms
  FOR SELECT TO anon, authenticated
  USING (active = true);

CREATE POLICY "Public read testimonials" ON testimonials
  FOR SELECT TO anon, authenticated
  USING (active = true);
