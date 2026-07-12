-- ============================================================
-- HOTEL CEMAR - Supabase Database Schema
-- ============================================================

-- Habitaciones
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_es TEXT NOT NULL,
  name_gl TEXT NOT NULL,
  name_en TEXT NOT NULL,
  desc_es TEXT NOT NULL,
  desc_gl TEXT NOT NULL,
  desc_en TEXT NOT NULL,
  amenities_es TEXT NOT NULL,
  amenities_gl TEXT NOT NULL,
  amenities_en TEXT NOT NULL,
  capacity INT NOT NULL DEFAULT 2,
  base_price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Promociones
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_es TEXT NOT NULL,
  name_gl TEXT NOT NULL,
  name_en TEXT NOT NULL,
  desc_es TEXT,
  desc_gl TEXT,
  desc_en TEXT,
  discount_percent INT DEFAULT 0,
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reservas
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INT NOT NULL DEFAULT 1,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  extras TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_method TEXT
    CHECK (payment_method IN ('stripe', 'paypal', 'manual')),
  payment_id TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Feedback / Testimonios
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar_url TEXT,
  text_es TEXT NOT NULL,
  text_gl TEXT NOT NULL,
  text_en TEXT NOT NULL,
  role_es TEXT,
  role_gl TEXT,
  role_en TEXT,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter
CREATE TABLE newsletter (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  lang TEXT DEFAULT 'es',
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- Conversaciones del Hotel AI (logs)
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  agent_used TEXT,
  lang TEXT DEFAULT 'es',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ÍNDICES
-- ============================================================
CREATE INDEX idx_reservations_email ON reservations(email);
CREATE INDEX idx_reservations_dates ON reservations(check_in, check_out);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_ai_conversations_session ON ai_conversations(session_id);

-- ============================================================
-- SEED DATA
-- ============================================================
INSERT INTO rooms (slug, name_es, name_gl, name_en, desc_es, desc_gl, desc_en, amenities_es, amenities_gl, amenities_en, capacity, base_price) VALUES
  ('double', 'Habitación Doble', 'Habitación Doble', 'Double Room',
   'Espaciosa habitación con cama de matrimonio, baño completo y vistas al jardín.',
   'Espazosa habitación con cama de matrimonio, baño completo e vistas ao xardín.',
   'Spacious room with double bed, en-suite bathroom and garden views.',
   'Cama Matrimonio, TV, Baño, WiFi, Calefacción',
   'Cama Matrimonio, TV, Baño, WiFi, Calefacción',
   'Double Bed, TV, Bathroom, WiFi, Heating',
   2, 75.00),
  ('twin', 'Habitación Twin', 'Habitación Twin', 'Twin Room',
   'Dos camas individuales ideales para compartir. Todo el confort que necesitas.',
   'Dúas camas individuais ideais para compartir. Todo o confort que precisas.',
   'Two single beds, ideal for sharing. All the comfort you need.',
   '2 Camas, TV, Baño, WiFi, Escritorio',
   '2 Camas, TV, Baño, WiFi, Escritorio',
   '2 Beds, TV, Bathroom, WiFi, Desk',
   2, 65.00),
  ('family', 'Habitación Familiar', 'Habitación Familiar', 'Family Room',
   'Amplio espacio para toda la familia. Hasta 4 huéspedes con todas las comodidades.',
   'Amplo espazo para toda a familia. Ata 4 hóspedes con todas as comodidades.',
   'Large space for the whole family. Up to 4 guests with all amenities.',
   '3 Camas, TV, Baño, WiFi, Zona Infantil',
   '3 Camas, TV, Baño, WiFi, Zona Infantil',
   '3 Beds, TV, Bathroom, WiFi, Kids Area',
   4, 95.00);

INSERT INTO testimonials (name, text_es, text_gl, text_en, role_es, role_gl, role_en, rating) VALUES
  ('María García',
   'Un lugar mágico. La combinación de naturaleza, caballos y la atención del personal hace que quieras volver.',
   'Un lugar máxico. A combinación de natureza, cabalos e a atención do persoal fai que queiras volver.',
   'A magical place. The combination of nature, horses, and staff attention makes you want to return.',
   'Madrid', 'Madrid', 'Madrid', 5),
  ('Carlos Rodríguez',
   'Volvemos cada año. El entorno es espectacular y las habitaciones son muy acogedoras.',
   'Volvemos cada ano. O entorno é espectacular e as habitacións son moi acolledoras.',
   'We come back every year. The setting is spectacular and the rooms are very cozy.',
   'Vigo', 'Vigo', 'Vigo', 5),
  ('Ana Martínez',
   'Perfecto para desconectar. Las rutas a caballo por el valle son una experiencia única.',
   'Perfecto para desconectar. As rutas a cabalo polo val son unha experiencia única.',
   'Perfect to disconnect. The horse trails through the valley are a unique experience.',
   'Ourense', 'Ourense', 'Ourense', 5);
