const TRANSLATIONS = {
  es: {
    nav: { inicio: 'Inicio', habitaciones: 'Habitaciones', servicios: 'Servicios', galeria: 'Galería', reservas: 'Reservas', contacto: 'Contacto' },
    hero: { badge: 'Complejo Natural · Rías Baixas · Galicia', title1: 'Naturaleza a tu', title2: 'Servicio', desc: 'Enclavado en el valle del río Tea, en un entorno ajardinado de más de 300.000 m² de terreno, descubre la esencia de Galicia en estado puro.', btn1: 'Reservar Ahora', btn2: 'Ver Habitaciones', stat1: '300.000 m²', stat1l: 'Naturaleza', stat2: '2 Estrellas', stat2l: 'Hotel Rural', stat3: '24/7', stat3l: 'Asistencia Hotel AI' },
    about: { title: 'Sobre Nosotros', subtitle: 'Descubre la historia y el espíritu del Complejo Natural Cemar', name: 'Complejo Natural Cemar', desc1: 'En el corazón de Mondariz Balneario, el Hotel Cemar es mucho más que un alojamiento. Somos un complejo natural que integra un hotel rural de dos estrellas, un centro hípico, una escuela de ajedrez y un sinfín de actividades al aire libre.', desc2: 'Rodeado de más de 300.000 m² de naturaleza, nuestras instalaciones están diseñadas para ofrecer una experiencia única de conexión con el entorno, el deporte y el bienestar.', feat1: 'Restaurante y Bar', feat2: 'Club Hípico', feat3: 'Piscina Exterior', feat4: 'Fitness Center', feat5: 'Aparcamiento Gratuito', feat6: 'WiFi Gratuito', badge: 'Entorno Natural', badget: 'Valle del Río Tea' },
    rooms: { title: 'Nuestras Habitaciones', subtitle: 'Confort y calidez en plena naturaleza gallega', double: { name: 'Habitación Doble', desc: 'Espaciosa habitación con cama de matrimonio, baño completo y vistas al jardín.', amenities: 'Cama Matrimonio, TV, Baño, WiFi, Calefacción' }, twin: { name: 'Habitación Twin', desc: 'Dos camas individuales ideales para compartir. Todo el confort que necesitas.', amenities: '2 Camas, TV, Baño, WiFi, Escritorio' }, family: { name: 'Habitación Familiar', desc: 'Amplio espacio para toda la familia. Hasta 4 huéspedes con todas las comodidades.', amenities: '3 Camas, TV, Baño, WiFi, Zona Infantil' }, from: 'desde', night: '/noche' },
    services: { title: 'Servicios e Instalaciones', subtitle: 'Todo lo que necesitas para una estancia inolvidable', items: [
      { name: 'Club Hípico', desc: 'Amplia oferta ecuestre desde formación hasta ocio. Clases y rutas a caballo.' },
      { name: 'Restaurante', desc: 'Gastronomía gallega tradicional con productos de temporada y recetas de la abuela.' },
      { name: 'Piscina Exterior', desc: 'Refrescante piscina al aire libre rodeada de jardines. Perfecta para el verano.' },
      { name: 'Actividades', desc: 'Paintball, kayak, rutas de senderismo, campamentos y campus deportivos.' },
      { name: 'Escuela Tiempo Libre', desc: 'Formación en el amplio campo del tiempo libre y ocio educativo.' },
      { name: 'Eventos', desc: 'Celebraciones, bodas, eventos corporativos en un entorno natural incomparable.' }
    ]},
    gallery: { title: 'Galería', subtitle: 'Imágenes que hablan por sí solas' },
    testimonials: { title: 'Lo Que Dicen Nuestros Huéspedes', subtitle: 'Opiniones reales de quienes ya han vivido la experiencia Cemar', items: [
      { text: 'Un lugar mágico. La combinación de naturaleza, caballos y la atención del personal hace que quieras volver. Los niños disfrutaron muchísimo.', name: 'María García', role: 'Madrid' },
      { text: 'Volvemos cada año. El entorno es espectacular y las habitaciones son muy acogedoras. El restaurante, con productos gallegos, es una maravilla.', name: 'Carlos Rodríguez', role: 'Vigo' },
      { text: 'Perfecto para desconectar. Las rutas a caballo por el valle son una experiencia única. Repetiremos sin duda.', name: 'Ana Martínez', role: 'Ourense' }
    ]},
    reservas: { title: 'Haz tu Reserva', subtitle: 'Selecciona fechas y confirma tu estancia en el paraíso natural', form: { checkin: 'Fecha de Entrada', checkout: 'Fecha de Salida', guests: 'Número de Huéspedes', room: 'Tipo de Habitación', roomOpt: 'Selecciona...', double: 'Habitación Doble', twin: 'Habitación Twin', family: 'Habitación Familiar', name: 'Nombre Completo', email: 'Correo Electrónico', phone: 'Teléfono', extras: '¿Algo que añadir?', extrasPh: 'Preferencias, solicitudes especiales...', submit: 'Confirmar Reserva', processing: 'Procesando...' }, payment: { title: 'Elige tu método de pago', subtitle: 'Reserva confirmada. Selecciona cómo quieres pagar.', payStripe: 'Pagar con Stripe', payPaypal: 'Pagar con PayPal', secure: 'Pago 100% seguro. Tus datos están protegidos.' }, confirmation: { title: '¡Reserva Confirmada!', desc: 'Hemos recibido tu pago. Te enviaremos un email con los detalles.' }},
    contact: { title: 'Contacto', subtitle: 'Estamos aquí para ayudarte', address: 'Carretera Ponteareas-Mondariz, KM 7, 36890 Mondariz Balneario, Pontevedra', phone: '+34 986 664 506', email: 'recepcion@hhotelcemar.es', mapAlt: 'Mapa de localización' },
    footer: { desc: 'Complejo Natural Cemar. Naturaleza, deporte y bienestar en el corazón de las Rías Baixas. Tu refugio en Galicia.', links: 'Enlaces', hotel: 'El Hotel', activities: 'Actividades', contactF: 'Contacto', legal: 'Legal', privacy: 'Política de Privacidad', cookies: 'Política de Cookies', legal2: 'Aviso Legal', newsletter: 'Suscríbete a nuestra newsletter', newsPh: 'Tu email', newsBtn: 'Enviar', copy: '© 2026 Complejo Natural Cemar. Todos los derechos reservados.' },
    ai: {
      welcome: '¡Bienvenido al Hotel Cemar! Soy **Hotel AI**, tu asistente virtual. Estoy aquí para ayudarte con reservas, información sobre el hotel, actividades y mucho más. ¿En qué puedo ayudarte?',
      placeholder: 'Escribe tu mensaje...',
      greeting: '¡Hola! Encantado de ayudarte. ¿Buscas información sobre nuestras habitaciones, servicios, o quieres hacer una reserva?',
      rooms: 'Contamos con varios tipos de alojamiento:\n\n• **Habitación Doble** — Ideal para parejas\n• **Habitación Twin** — Dos camas individuales\n• **Habitación Familiar** — Para toda la familia\n\nPuedes consultar precios y disponibilidad en nuestra [sección de habitaciones](/habitaciones) o hacer tu [reserva directamente](/reservas).',
      prices: 'Los precios varían según temporada y tipo de habitación. Para obtener la tarifa más actualizada al segundo, te recomiendo consultar directamente nuestro [Sistema de Reservas](/reservas).',
      location: 'Estamos en la **Carretera Ponteareas-Mondariz, KM 7**, en **Mondariz Balneario, Pontevedra**, en pleno Valle del Río Tea, a solo 25 minutos de Vigo.',
      activities: 'Ofrecemos un sinfín de actividades:\n\n• **Club Hípico** — Rutas y clases a caballo\n• **Paintball y Kayak** — Aventura asegurada\n• **Piscina Exterior** — Relájate en la naturaleza\n• **Senderismo** — Explora el Valle del Tea\n• **Campamentos** — Para los más pequeños\n\nMás información en nuestra sección de [Servicios](/servicios).',
      contact: 'Puedes contactarnos:\n\n• 📞 +34 986 664 506\n• 📧 recepcion@hhotelcemar.es\n• 📍 Carretera Ponteareas-Mondariz, KM 7\n\nO visítanos en nuestra [página de contacto](/contacto).',
      thanks: '¡De nada! Si necesitas cualquier otra cosa, no dudes en escribirme. Estoy aquí 24/7 para ayudarte. 😊',
      default: 'Gracias por tu mensaje. Permíteme consultar la información más adecuada para ti. ¿Podrías darme más detalles? Así podré ayudarte de forma más precisa.',
      fallbackPrice: 'Actualmente no dispongo de esa tarifa exacta en mi base de datos. Para obtener el precio más actualizado, por favor consulta nuestro [buscador de reservas online](/reservas).',
      langDetect: 'Detecto que prefieres el {lang}. Estaré encantado de atenderte en ese idioma.',
      notFound: 'No tengo una respuesta específica para esa consulta. ¿Prefieres preguntarme sobre **habitaciones**, **precios**, **actividades**, **localización** o **contacto**?'
    }
  },

  gl: {
    nav: { inicio: 'Inicio', habitaciones: 'Habitacións', servicios: 'Servizos', galeria: 'Galería', reservas: 'Reservas', contacto: 'Contacto' },
    hero: { badge: 'Complexo Natural · Rías Baixas · Galicia', title1: 'Natureza ao teu', title2: 'Servizo', desc: 'Enclavado no val do río Tea, nun entorno axardinado de máis de 300.000 m² de terreo, descubre a esencia de Galicia en estado puro.', btn1: 'Reservar Agora', btn2: 'Ver Habitacións', stat1: '300.000 m²', stat1l: 'Natureza', stat2: '2 Estrelas', stat2l: 'Hotel Rural', stat3: '24/7', stat3l: 'Asistencia Hotel AI' },
    about: { title: 'Sobre Nós', subtitle: 'Descubre a historia e o espírito do Complexo Natural Cemar', name: 'Complexo Natural Cemar', desc1: 'No corazón de Mondariz Balneario, o Hotel Cemar é moito máis que un aloxamento. Somos un complexo natural que integra un hotel rural de dúas estrelas, un centro hípico, unha escola de xadrez e un senfín de actividades ao aire libre.', desc2: 'Rodeado de máis de 300.000 m² de natureza, as nosas instalacións están deseñadas para ofrecer unha experiencia única de conexión co entorno, o deporte e o benestar.', feat1: 'Restaurante e Bar', feat2: 'Club Hípico', feat3: 'Piscina Exterior', feat4: 'Fitness Center', feat5: 'Aparcadoiro Gratuíto', feat6: 'WiFi Gratuíto', badge: 'Entorno Natural', badget: 'Val do Río Tea' },
    rooms: { title: 'As Nosas Habitacións', subtitle: 'Confort e calidez en plena natureza galega', double: { name: 'Habitación Doble', desc: 'Espazosa habitación con cama de matrimonio, baño completo e vistas ao xardín.', amenities: 'Cama Matrimonio, TV, Baño, WiFi, Calefacción' }, twin: { name: 'Habitación Twin', desc: 'Dúas camas individuais ideais para compartir. Todo o confort que precisas.', amenities: '2 Camas, TV, Baño, WiFi, Escritorio' }, family: { name: 'Habitación Familiar', desc: 'Amplo espazo para toda a familia. Ata 4 hóspedes con todas as comodidades.', amenities: '3 Camas, TV, Baño, WiFi, Zona Infantil' }, from: 'dende', night: '/noite' },
    services: { title: 'Servizos e Instalacións', subtitle: 'Todo o que necesitas para unha estancia inesquecible', items: [
      { name: 'Club Hípico', desc: 'Ampla oferta ecuestre dende formación ata ocio. Clases e rutas a cabalo.' },
      { name: 'Restaurante', desc: 'Gastronomía galega tradicional con produtos de tempada e receitas da avoa.' },
      { name: 'Piscina Exterior', desc: 'Refrescante piscina ao aire libre rodeada de xardíns. Perfecta para o verán.' },
      { name: 'Actividades', desc: 'Paintball, kayak, rutas de sendeirismo, campamentos e campus deportivos.' },
      { name: 'Escola Tempo Libre', desc: 'Formación no amplo campo do tempo libre e ocio educativo.' },
      { name: 'Eventos', desc: 'Celebracións, vodas, eventos corporativos nun entorno natural incomparable.' }
    ]},
    gallery: { title: 'Galería', subtitle: 'Imaxes que falan por si soas' },
    testimonials: { title: 'O Que Din Os Nosos Hóspedes', subtitle: 'Opinións reais de quen xa viviron a experiencia Cemar', items: [
      { text: 'Un lugar máxico. A combinación de natureza, cabalos e a atención do persoal fai que queiras volver. Os nenos disfrutaron moitísimo.', name: 'María García', role: 'Madrid' },
      { text: 'Volvemos cada ano. O entorno é espectacular e as habitacións son moi acolledoras. O restaurante, con produtos galegos, é unha marabilla.', name: 'Carlos Rodríguez', role: 'Vigo' },
      { text: 'Perfecto para desconectar. As rutas a cabalo polo val son unha experiencia única. Repetiremos sen dúbida.', name: 'Ana Martínez', role: 'Ourense' }
    ]},
    reservas: { title: 'Fai a túa Reserva', subtitle: 'Selecciona datas e confirma a túa estancia no paraíso natural', form: { checkin: 'Data de Entrada', checkout: 'Data de Saída', guests: 'Número de Hóspedes', room: 'Tipo de Habitación', roomOpt: 'Selecciona...', double: 'Habitación Doble', twin: 'Habitación Twin', family: 'Habitación Familiar', name: 'Nome Completo', email: 'Correo Electrónico', phone: 'Teléfono', extras: 'Algo que engadir?', extrasPh: 'Preferencias, solicitudes especiais...', submit: 'Confirmar Reserva', processing: 'Procesando...' }, payment: { title: 'Elixe o teu método de pago', subtitle: 'Reserva confirmada. Selecciona como queres pagar.', payStripe: 'Pagar con Stripe', payPaypal: 'Pagar con PayPal', secure: 'Pago 100% seguro. Os teus datos están protexidos.' }, confirmation: { title: '¡Reserva Confirmada!', desc: 'Recibimos o teu pago. Enviarémosche un email cos detalles.' }},
    contact: { title: 'Contacto', subtitle: 'Estamos aquí para axudarche', address: 'Estrada Ponteareas-Mondariz, KM 7, 36890 Mondariz Balneario, Pontevedra', phone: '+34 986 664 506', email: 'recepcion@hhotelcemar.es', mapAlt: 'Mapa de localización' },
    footer: { desc: 'Complexo Natural Cemar. Natureza, deporte e benestar no corazón das Rías Baixas. O teu refuxio en Galicia.', links: 'Ligazóns', hotel: 'O Hotel', activities: 'Actividades', contactF: 'Contacto', legal: 'Legal', privacy: 'Política de Privacidade', cookies: 'Política de Cookies', legal2: 'Aviso Legal', newsletter: 'Subscríbete á nosa newsletter', newsPh: 'O teu email', newsBtn: 'Enviar', copy: '© 2026 Complexo Natural Cemar. Tódolos dereitos reservados.' },
    ai: {
      welcome: 'Benvido ao Hotel Cemar! Son **Hotel AI**, o teu asistente virtual. Estou aquí para axudarche con reservas, información sobre o hotel, actividades e moito máis. En que podo axudarte?',
      placeholder: 'Escribe a túa mensaxe...',
      greeting: 'Ola! Encantado de axudarche. Buscas información sobre as nosas habitacións, servizos, ou queres facer unha reserva?',
      rooms: 'Contamos con varios tipos de aloxamento:\n\n• **Habitación Doble** — Ideal para parellas\n• **Habitación Twin** — Dúas camas individuais\n• **Habitación Familiar** — Para toda a familia\n\nPodes consultar prezos e dispoñibilidade na nosa [sección de habitacións](/habitacions) ou facer a túa [reserva directamente](/reservas).',
      prices: 'Os prezos varían segundo tempada e tipo de habitación. Para obter a tarifa máis actualizada ao segundo, recoméndoche consultar directamente o noso [Sistema de Reservas](/reservas).',
      location: 'Estamos na **Estrada Ponteareas-Mondariz, KM 7**, en **Mondariz Balneario, Pontevedra**, en pleno Val do Río Tea, a só 25 minutos de Vigo.',
      activities: 'Ofrecemos un senfín de actividades:\n\n• **Club Hípico** — Rutas e clases a cabalo\n• **Paintball e Kayak** — Aventura asegurada\n• **Piscina Exterior** — Reláxate na natureza\n• **Sendeirismo** — Explora o Val do Tea\n• **Campamentos** — Para os máis pequenos\n\nMáis información na nosa sección de [Servizos](/servizos).',
      contact: 'Podes contactar connosco:\n\n• 📞 +34 986 664 506\n• 📧 recepcion@hhotelcemar.es\n• 📍 Estrada Ponteareas-Mondariz, KM 7\n\nOu visítanos na nosa [páxina de contacto](/contacto).',
      thanks: 'De nada! Se precisas calquera outra cousa, non dubides en escribirme. Estou aquí 24/7 para axudarte. 😊',
      default: 'Grazas pola túa mensaxe. Permíteme consultar a información máis axeitada para ti. Poderías darme máis detalles? Así poderé axudarte de forma máis precisa.',
      fallbackPrice: 'Actualmente non dispoño desa tarifa exacta na miña base de datos. Para obter o prezo máis actualizado, por favor consulta o noso [buscador de reservas online](/reservas).',
      langDetect: 'Detecto que prefires o {lang}. Estarei encantado de atenderte nese idioma.',
      notFound: 'Non teño unha resposta específica para esa consulta. Prefires preguntarme sobre **habitacións**, **prezos**, **actividades**, **localización** ou **contacto**?'
    }
  },

  en: {
    nav: { inicio: 'Home', habitaciones: 'Rooms', servicios: 'Services', galeria: 'Gallery', reservas: 'Book', contacto: 'Contact' },
    hero: { badge: 'Natural Complex · Rías Baixas · Galicia', title1: 'Nature at Your', title2: 'Service', desc: 'Nestled in the Tea river valley, set in landscaped grounds of over 300,000 m², discover the essence of Galicia in its purest state.', btn1: 'Book Now', btn2: 'View Rooms', stat1: '300,000 m²', stat1l: 'Nature', stat2: '2 Stars', stat2l: 'Country Hotel', stat3: '24/7', stat3l: 'Hotel AI Assistance' },
    about: { title: 'About Us', subtitle: 'Discover the story and spirit of Complejo Natural Cemar', name: 'Complejo Natural Cemar', desc1: 'In the heart of Mondariz Balneario, Hotel Cemar is more than just accommodation. We are a natural complex integrating a two-star country hotel, an equestrian center, a chess school, and endless outdoor activities.', desc2: 'Surrounded by over 300,000 m² of nature, our facilities are designed to offer a unique experience of connection with the environment, sports, and wellness.', feat1: 'Restaurant & Bar', feat2: 'Equestrian Club', feat3: 'Outdoor Pool', feat4: 'Fitness Center', feat5: 'Free Parking', feat6: 'Free WiFi', badge: 'Natural Setting', badget: 'Tea River Valley' },
    rooms: { title: 'Our Rooms', subtitle: 'Comfort and warmth in the heart of Galician nature', double: { name: 'Double Room', desc: 'Spacious room with double bed, en-suite bathroom and garden views.', amenities: 'Double Bed, TV, Bathroom, WiFi, Heating' }, twin: { name: 'Twin Room', desc: 'Two single beds, ideal for sharing. All the comfort you need.', amenities: '2 Beds, TV, Bathroom, WiFi, Desk' }, family: { name: 'Family Room', desc: 'Large space for the whole family. Up to 4 guests with all amenities.', amenities: '3 Beds, TV, Bathroom, WiFi, Kids Area' }, from: 'from', night: '/night' },
    services: { title: 'Services & Facilities', subtitle: 'Everything you need for an unforgettable stay', items: [
      { name: 'Equestrian Club', desc: 'Wide equestrian offering from training to leisure. Horse riding lessons and trails.' },
      { name: 'Restaurant', desc: 'Traditional Galician cuisine with seasonal products and grandmother\'s recipes.' },
      { name: 'Outdoor Pool', desc: 'Refreshing outdoor pool surrounded by gardens. Perfect for summer.' },
      { name: 'Activities', desc: 'Paintball, kayak, hiking trails, camps, and sports programs.' },
      { name: 'Leisure School', desc: 'Training in the broad field of leisure and educational recreation.' },
      { name: 'Events', desc: 'Celebrations, weddings, corporate events in an unmatched natural setting.' }
    ]},
    gallery: { title: 'Gallery', subtitle: 'Images that speak for themselves' },
    testimonials: { title: 'What Our Guests Say', subtitle: 'Real reviews from those who have experienced Cemar', items: [
      { text: 'A magical place. The combination of nature, horses, and staff attention makes you want to return. The children enjoyed it immensely.', name: 'Maria García', role: 'Madrid' },
      { text: 'We come back every year. The setting is spectacular and the rooms are very cozy. The restaurant, with Galician products, is wonderful.', name: 'Carlos Rodríguez', role: 'Vigo' },
      { text: 'Perfect to disconnect. The horse trails through the valley are a unique experience. We will definitely repeat.', name: 'Ana Martínez', role: 'Ourense' }
    ]},
    reservas: { title: 'Make a Reservation', subtitle: 'Select dates and confirm your stay in natural paradise', form: { checkin: 'Check-in Date', checkout: 'Check-out Date', guests: 'Number of Guests', room: 'Room Type', roomOpt: 'Select...', double: 'Double Room', twin: 'Twin Room', family: 'Family Room', name: 'Full Name', email: 'Email Address', phone: 'Phone', extras: 'Anything to add?', extrasPh: 'Preferences, special requests...', submit: 'Confirm Booking', processing: 'Processing...' }, payment: { title: 'Choose your payment method', subtitle: 'Reservation confirmed. Select how you want to pay.', payStripe: 'Pay with Stripe', payPaypal: 'Pay with PayPal', secure: '100% secure payment. Your data is protected.' }, confirmation: { title: 'Booking Confirmed!', desc: 'We received your payment. We will send you an email with the details.' }},
    contact: { title: 'Contact', subtitle: 'We are here to help you', address: 'Carretera Ponteareas-Mondariz, KM 7, 36890 Mondariz Balneario, Pontevedra', phone: '+34 986 664 506', email: 'recepcion@hhotelcemar.es', mapAlt: 'Location map' },
    footer: { desc: 'Complejo Natural Cemar. Nature, sports, and wellness in the heart of the Rías Baixas. Your refuge in Galicia.', links: 'Links', hotel: 'The Hotel', activities: 'Activities', contactF: 'Contact', legal: 'Legal', privacy: 'Privacy Policy', cookies: 'Cookies Policy', legal2: 'Legal Notice', newsletter: 'Subscribe to our newsletter', newsPh: 'Your email', newsBtn: 'Send', copy: '© 2026 Complejo Natural Cemar. All rights reserved.' },
    ai: {
      welcome: 'Welcome to Hotel Cemar! I am **Hotel AI**, your virtual assistant. I am here to help you with bookings, hotel information, activities, and much more. How can I help you?',
      placeholder: 'Type your message...',
      greeting: 'Hello! I\'d be happy to help. Are you looking for information about our rooms, services, or would you like to make a reservation?',
      rooms: 'We offer several types of accommodation:\n\n• **Double Room** — Ideal for couples\n• **Twin Room** — Two single beds\n• **Family Room** — For the whole family\n\nYou can check prices and availability in our [rooms section](/rooms) or [book directly](/book).',
      prices: 'Prices vary by season and room type. For the most up-to-date rate, I recommend checking our [Booking System](/book) directly.',
      location: 'We are located at **Carretera Ponteareas-Mondariz, KM 7**, in **Mondariz Balneario, Pontevedra**, in the Tea River Valley, just 25 minutes from Vigo.',
      activities: 'We offer countless activities:\n\n• **Equestrian Club** — Horse riding trails and lessons\n• **Paintball & Kayak** — Adventure guaranteed\n• **Outdoor Pool** — Relax in nature\n• **Hiking** — Explore the Tea Valley\n• **Camps** — For the little ones\n\nMore info in our [Services section](/services).',
      contact: 'You can contact us:\n\n• 📞 +34 986 664 506\n• 📧 recepcion@hhotelcemar.es\n• 📍 Carretera Ponteareas-Mondariz, KM 7\n\nOr visit our [contact page](/contact).',
      thanks: 'You\'re welcome! If you need anything else, feel free to write. I\'m here 24/7 to help you. 😊',
      default: 'Thank you for your message. Let me check the most appropriate information for you. Could you provide more details? That way I can help you more accurately.',
      fallbackPrice: 'I currently don\'t have that exact rate in my database. For the most updated price, please check our [online booking system](/book).',
      langDetect: 'I detect that you prefer {lang}. I will be happy to assist you in that language.',
      notFound: 'I don\'t have a specific response for that query. Would you like to ask me about **rooms**, **prices**, **activities**, **location**, or **contact**?'
    }
  }
};
