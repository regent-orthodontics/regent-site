// Regent Orthodontics — datos verificados contra ~/dev/regent-site/src/config.ts
export const site = {
  draft: true,   // barra de aviso visible; se quita al publicar

  name: 'Regent Orthodontics',
  tagline: 'Specialist orthodontics in Newtownards',
  url: 'https://regentorthodontics.com',
  locale: 'en-GB',
  lang: 'en',

  contact: {
    email: 'admin@regentorthodontics.com',
    // El número que había aquí era el móvil personal del titular, puesto
    // mientras la clínica no tiene línea. Un móvil personal publicado en la
    // web de una clínica no se retira después: queda indexado, copiado en
    // directorios y citado por asistentes. No se publica ninguno hasta que
    // haya línea de la práctica; el correo es el canal mientras tanto.
    phone: null,
    phonePending: true,
    emailProvisional: false,
    address: {
      street: '11/11A Regent Street', locality: 'Newtownards',
      region: 'County Down', postcode: 'BT23 4AB', country: 'GB',
      // Centroide oficial del código postal (Ordnance Survey vía postcodes.io).
      // Alimenta el mapa y el geo del schema; no es el portal exacto.
      lat: 54.594207, lon: -5.697875,
    },
  },

  // 8 a 4, corregido el 20-sep-2026. Sale de aquí a la web, al schema
  // openingHoursSpecification y al llms.txt, así que no hay que tocarlo en
  // ningún otro sitio. ⚠️ El horario viejo (09:00-17:30) sigue escrito en
  // REGENT_ORTHODONTICS_MAESTRO.md §2 y en BR3IN_MAESTRO.md §7-bis.
  hours: [{ days: 'Mon-Fri', open: '08:00', close: '16:00' }],

  // PROVISIONALES: puestos por BR3IN a partir de rangos de mercado.
  // `confirmed: false` los marca con ~ en la web y bloquea la publicación.
  services: [
    { name: 'Initial consultation', slug: 'consultation',
      description: 'A full assessment, the options explained and indicative prices, before anything is decided. The consultation itself is free.',
      price: 0, free: true, from: false, confirmed: true,
      // Gratis la consulta; lo que se cobra son los registros —fotografías,
      // radiografías, escaneos— que hacen falta para planificar. Separarlo
      // es lo que evita que "free consultation" signifique otra cosa al
      // llegar la factura.
      tiers: [
        { label: 'The consultation itself', price: 0 },
        { label: 'Records and documentation', price: 150, from: true },
      ],
      detail: {
        priceNote: 'The consultation costs nothing. If you go ahead, the records and documentation needed to plan your treatment are charged from £150.',
        sections: [
          { heading: 'What happens at the appointment',
            paragraphs: ['The first visit is about finding out what is going on and what your options are. Nothing is fitted, nothing is taken and nothing is decided on the day.'],
            list: ['We look at how the teeth meet, not only how they look',
                   'Indicative prices for each option, and how long each one takes',
                   'Time to ask questions and go home and think about it',
                   'If you want to go ahead, we book the records — photographs, x-rays and scans — for another day'] },
          { heading: 'Who it is for',
            paragraphs: ['Children referred by their dentist, teenagers at the usual age for treatment, and adults who were told years ago that it was too late. It is generally not.'] },
        ],
        faq: [
          { q: 'Is the consultation really free?', a: 'Yes. The appointment itself costs nothing and there is no charge on the day. If you decide to go ahead, the records we need to plan properly — photographs, x-rays and scans — are charged from £150, and they are booked for another visit. Nobody pays anything before deciding.' },
          { q: 'Do I need a referral from my dentist?', a: 'No. You can book directly. If you are being seen by a dentist we will write to them, with your permission, so everyone is working from the same plan.' },
          { q: 'Will I be pushed into treatment on the day?', a: 'No. You leave with the options explained and an idea of what each would cost. Whether you go ahead, and when, is your decision.' },
        ],
      } },

    { name: 'Fixed metal braces', slug: 'metal-braces',
      hero: {
        image: '/treatments/metal-bracket.webp',
        // Mismo trato que el cerámico: acero pulido sobre negro. El metal se
        // lee mejor sobre oscuro que sobre crema, y además evita que la
        // ficha del aparato más visible sea la única que empieza en blanco.
        dark: true,
        alt: 'A polished steel self-ligating orthodontic bracket, its sliding door and tie wings visible, lit against black',
        beats: [
          'People will notice.',
          'A bracket on each tooth, joined by a wire that is changed every few weeks.',
          'It moves teeth the others cannot. That is why it is still the one we reach for.',
        ],
      },
      description: 'Brackets bonded to the teeth and joined by a wire. The most predictable way to move teeth, and the option that handles the difficult cases.',
      price: 1500, from: true, confirmed: true,
      tiers: [
        { label: 'Children — one arch', price: 1500, from: true },
        { label: 'Children — both arches', price: 2000, from: true },
        { label: 'Adults — one arch', price: 2300, from: true },
        { label: 'Adults — both arches', price: 3000, from: true },
      ],
      detail: {
        priceNote: 'What you pay depends on whether one arch or both need treating. The exact figure is in your written plan before you start.',
        sections: [
          { heading: 'How it works',
            paragraphs: ['A small bracket is bonded to each tooth and a wire runs through them. The wire is changed every few weeks; each change asks the teeth to move a little further. Nothing is forced, and the process is slow on purpose — bone needs time to rebuild around a tooth in its new position.'] },
          { heading: 'What to expect',
            paragraphs: ['The first few days are the strangest: the teeth feel tender and the lips take a week or so to get used to the brackets. After that most people forget they are there.'],
            list: ['Adjustments every 6 to 10 weeks',
                   'Typical treatment runs 12 to 24 months',
                   'Cleaning takes longer and matters more than usual',
                   'Hard and sticky food will pull a bracket off, and that means an extra visit'] },
          { heading: 'After treatment',
            paragraphs: ['Teeth drift back if nothing holds them. Retainers are part of the treatment, not an optional extra, and they are worn for as long as you want the result to last.'] },
        ],
        faq: [
          { q: 'Does it hurt?', a: 'It aches for two or three days after each adjustment, in the way a bruise aches. Ordinary painkillers deal with it. Sharp pain is not normal and means something needs looking at.' },
          { q: 'Can adults have fixed braces?', a: 'Yes. Teeth move at any age as long as the gums and bone are healthy. Adult treatment sometimes takes a little longer.' },
          { q: 'Can I play sport?', a: 'Yes, with a mouthguard for contact sports. We can make one that fits over the brace.' },
        ],
      } },

    { name: 'Ceramic braces', slug: 'ceramic-braces',
      hero: {
        image: '/treatments/ceramic-bracket.webp',
        // Esta ficha entera va sobre negro: el bracket es transparente y
        // sobre crema no se ve. El hero no funde a claro al terminar.
        dark: true,
        alt: 'A single ceramic orthodontic bracket, clear and tooth-coloured, lit against black',
        beats: [
          'You’ll have to look twice.',
          'Ceramic, not metal. Everything else about it stays the same.',
          'Not invisible. Just not the first thing anyone sees.',
        ],
      },
      description: 'The same fixed appliance, with brackets in tooth-coloured ceramic instead of metal.',
      price: 2900, from: true, confirmed: true,
      tiers: [
        { label: 'One arch', price: 2900, from: true },
        { label: 'Both arches', price: 3600, from: true },
      ],
      detail: {
        priceNote: 'The difference over metal is the material itself and the extra care it needs at both ends of treatment.',
        sections: [
          { heading: 'The difference',
            paragraphs: ['Ceramic brackets do the same job as metal ones and are much less obvious at conversational distance. They are not invisible, and the wire still shows.'] },
          { heading: 'The trade-offs, honestly',
            paragraphs: ['This is the option people choose for appearance, and it is worth knowing what that costs beyond the price.'],
            list: ['Ceramic is more brittle than metal, so a bracket is easier to break',
                   'Treatment can run slightly longer',
                   'The brackets themselves do not stain; the clear ties between visits can, with red wine, curry and smoking',
                   'Removal takes longer and needs more care'] },
        ],
        faq: [
          { q: 'Will they stain?', a: 'The brackets do not. The small elastic ties holding the wire can pick up colour between appointments, and they are replaced at every visit.' },
          { q: 'Are they suitable for every case?', a: 'Not always. Where large movements or heavy forces are needed, metal is the safer choice. We will tell you at the consultation.' },
        ],
      } },

    { name: 'Clear aligners', slug: 'clear-aligners',
      hero: {
        image: '/treatments/aligner-hf1.webp',
        focus: '0% 50%',
        imageStacked: '/treatments/aligner-hf1-c.webp',
        alt: 'A clear orthodontic aligner held between gloved fingers against black',
        dark: true,
        // Composición lateral: la fotografía ya trae el aparato a la
        // izquierda y negro a la derecha, así que el texto ocupa ese hueco
        // en lugar de superponerse a nada.
        layout: 'side',
        beats: [
          'Twenty-two hours a day.',
          'A sequence of clear trays. Each one asks the teeth for a little more.',
          'They only work while they are in. That part is yours.',
        ],
      },
      description: 'A series of removable transparent trays, changed at home on a set schedule. Invisalign, Angel Aligners and others.',
      price: 3800, from: true, confirmed: true,
      detail: {
        priceNote: 'Includes the scans, the full series of aligners, all appointments and your retainers at the end.',
        sections: [
          { heading: 'How it works',
            paragraphs: ['The teeth are scanned and a sequence of aligners is made, each one slightly different from the last. You change to the next one on schedule and the teeth follow the sequence.'] },
          { heading: 'What it asks of you',
            paragraphs: ['This is the honest part, and the reason aligner treatment sometimes fails. The aligners only work while they are in your mouth.'],
            list: ['22 hours a day, every day — they come out to eat and to brush',
                   'Nothing but water while they are in',
                   'Small tooth-coloured attachments are usually bonded to some teeth so the aligner can grip',
                   'If you will not wear them, fixed braces will get you a better result'] },
          { heading: 'The systems we use',
            paragraphs: ['We are an Invisalign provider, and we also treat with Angel Aligners. Both work the same way — a sequence of trays worn to a schedule — and both are planned and carried out by the same clinician here. What separates them is the material, the cost and how each handles particular movements.',
                         'Which one we suggest depends on your teeth, not on the brand you came in asking for. Your written plan says which system, and why.'] },
          { heading: 'What they are good at, and what they are not',
            paragraphs: ['Aligners handle crowding, spacing and mild to moderate corrections well. Some movements — large rotations, closing certain gaps, moving roots — are more predictable with a fixed appliance. We will say which applies to you rather than sell you the option you came in asking for.'] },
        ],
        faq: [
          { q: 'Can anyone tell I am wearing them?', a: 'Rarely at conversational distance. The attachments are visible up close.' },
          { q: 'What if I lose one?', a: 'Tell us straight away. Depending on where you are in the sequence you may go back to the previous one or move on; do not simply leave a gap.' },
          { q: 'Is it faster than braces?', a: 'Not necessarily. It depends on the case, not on the appliance.' },
        ],
      } },

    { name: 'Retainers', slug: 'retainers',
      description: 'Fixed or removable, to hold the teeth where treatment left them. Retainers are included with treatment here — these prices are for anyone who needs a new one, or who was treated somewhere else.',
      price: 60, from: true, confirmed: true,
      tiers: [
        { label: 'Removable retainer', price: 60, from: true },
        { label: 'Bonded retainer — one arch', price: 200, from: true },
        { label: 'Bonded retainer — both arches', price: 380, from: true },
      ],
      detail: {
        priceNote: 'If we treated you, your retainers are part of the fee and these prices do not apply to you. They are for a replacement, or for someone who was treated elsewhere and needs a retainer made.',
        sections: [
          { heading: 'Why they are not optional',
            paragraphs: ['Teeth are held in bone by fibres that have a memory. Left alone after treatment, they drift — sometimes within months. A retainer is what turns a result into a lasting one, and it is the part of orthodontics people most often regret skipping.'] },
          { heading: 'The two kinds',
            paragraphs: ['Most people end up with both: a fixed wire behind the front teeth and a removable retainer worn at night.'],
            list: ['Fixed: a thin wire bonded behind the teeth. Nothing to remember, but it needs careful cleaning and checking',
                   'Removable: a clear retainer worn at night. Works only if it is actually worn'] },
        ],
        faq: [
          { q: 'How long do I have to wear it?', a: 'For as long as you want the teeth to stay where they are. In practice that means indefinitely, at night.' },
          { q: 'I lost mine years ago and the teeth have moved. Can it be fixed?', a: 'Usually, yes, though it may mean a short course of treatment before a new retainer. Come and let us look.' },
        ],
      } },
  ],
  currency: 'GBP',

  compliance: {
    regulated: true,
    regulator: { name: 'General Dental Council', url: 'https://www.gdc-uk.org', phone: '020 7167 6000',
      // Títulos con los que el GDC registra. Publicar a alguien con un título
      // que no está aquí lo describe como algo que no es, y eso es asunto del
      // regulador, no una errata de redacción.
      titles: ['Dentist', 'Dental Nurse', 'Dental Hygienist', 'Dental Therapist',
               'Orthodontic Therapist', 'Dental Technician', 'Clinical Dental Technician',
               'Specialist Orthodontist', 'Specialist in Oral Surgery',
               'Specialist in Paediatric Dentistry', 'Specialist in Endodontics',
               'Specialist in Periodontics', 'Specialist in Prosthodontics',
               'Specialist in Restorative Dentistry', 'Specialist in Special Care Dentistry'] },
    // Nombres y cargos según POL-01 §3 y las firmas de POL-54/POL-55.
    // `role` es el cargo ante RQIA; `qualification` es el título GDC y es lo
    // que valida el checklist contra la lista del regulador. La fuente de
    // títulos y números es el registro público del GDC (olr.gdc-uk.org),
    // consultado el 22-sep-2026; las políticas no los recogen.
    registrations: [
      // GDC 206244: Registered, Dentist, Specialty Orthodontics — está en la
      // lista de especialistas, que es lo que permite decir "Specialist".
      // Periodo vigente hasta el 31-dic-2026.
      { person: 'Dr Diego Chavesta Rivadeneyra', qualifications: ['Specialist Orthodontist'],
        role: 'Responsible Person', country: 'United Kingdom', number: '206244' },
      // Dos títulos, no uno: el GDC registra a una persona con todos los que
      // tenga. Va como lista y no como texto suelto porque el checklist
      // valida cada título contra la relación del regulador, y
      // "Orthodontic Therapist and Dental Nurse" no es ninguno de ellos.
      { person: 'Ms Yesica Alves Barreto',
        qualifications: ['Orthodontic Therapist', 'Dental Nurse'],
        // GDC 269728: Registered, Dental Care Professional, títulos Dental
        // Nurse y Orthodontic Therapist. Periodo vigente hasta el 31-jul-2027.
        role: 'Registered Manager', qualificationConfirmed: true,
        country: 'United Kingdom', number: '269728' },
    ],
    // ── Reclamaciones ────────────────────────────────────────────────
    // Todo este bloque sale de POL-01. Los plazos anteriores (3 días para
    // acusar recibo, 10 para responder) no salían de ninguna parte y eran
    // la mitad de los que la política se concede: la web prometía en
    // público un servicio que la clínica no se ha comprometido a dar.
    // Los de ahora son los de POL-01 §5.2 y §5.4, alineados con el HSC
    // Complaints Procedure (revisión de abril de 2023).
    complaints: {
      acknowledgeDays: 2,
      respondDays: 20,
      manager: 'Ms Yesica Alves Barreto',
      managerRole: 'Registered Manager',
      procedure: 'Tell any member of the team, in person, by telephone, by email or in writing. You do not have to use the word "complaint" for us to treat it as one.',
      // POL-01 §6.1: RQIA es la vía de escalado de TODOS los pacientes y
      // está abierta en cualquier momento, se haya usado o no el
      // procedimiento interno. Omitirla era el fallo más serio de la
      // página: se citaba un organismo que la política no menciona
      // (Dental Complaints Service) y se callaba el regulador que sí.
      escalation: {
        rqia: { name: 'The Regulation and Quality Improvement Authority (RQIA)',
                address: 'James House, 2–4 Cromac Avenue, Belfast BT7 2JA',
                email: 'registration@rqia.org.uk',
                note: 'You can go to RQIA at any time, whether or not you have complained to us first.' },
        hsc: { name: 'Northern Ireland Public Services Ombudsman (NIPSO)',
               advocacy: 'Patient and Client Council',
               note: 'For treatment provided under Health Service arrangements, once we have given you our response.' },
        gdc: { note: 'Where your concern is about a registered professional\u2019s fitness to practise, rather than about the service.' },
        // POL-01, cláusula final: una queja sobre el crédito no es una
        // queja sobre el tratamiento y no va ni a RQIA ni al GDC.
        finance: { name: 'Financial Ombudsman Service',
                   note: 'A complaint about a credit agreement — the application, the terms, the payments or the lender — goes to the finance provider, and then to the Financial Ombudsman Service. We will help you find the right contact.' },
      },
    },
    // La fecha que la web publica como "last reviewed". El requisito de la
    // Registered Manager es revisar al menos cada trimestre y dejar constancia;
    // una fecha vieja tras un cambio de contenido es peor que no ponerla,
    // porque afirma que lo que hay delante se revisó ese día.
    lastReviewed: '2026-09-22',
  },

  // ── Privacidad ─────────────────────────────────────────────────────
  // Plazos y bases legales SIN CONFIRMAR: los tiene que validar el
  // solicitor antes de publicar. Un plazo de conservación equivocado en
  // la política de una clínica es un incumplimiento del UK GDPR, no una
  // errata.
  // ── Aviso de privacidad del SITIO WEB ───────────────────────────────
  // Esto es POL-55, el Website Privacy Notice de la clínica, firmado por
  // el Responsible Person y la Registered Manager. Antes aquí había otro
  // documento: hablaba de historias clínicas, radiografías y fotografías
  // del tratamiento. Eso es el aviso de PACIENTE, que POL-55 dice
  // expresamente que se entrega en mano en la primera cita y no vive en
  // el sitio. Publicarlo aquí describía un tratamiento de datos que esta
  // web no hace, y a la vez callaba el que sí hace.
  // Donde POL-55 y esta página difieran, gobierna POL-55 (y sobre POL-55,
  // POL-05). Este fichero se corrige, nunca al revés.
  privacy: {
    policyRef: 'POL-55',
    version: 'v1.0',
    // POL-55 lleva "[date of adoption]" sin rellenar y la cláusula de
    // comienzo de POL-01 ata la entrada en vigor al registro de RQIA.
    confirmed: false,
    draftNote: 'This notice reproduces POL-55, the practice’s website privacy notice. It takes effect when the practice opens to patients, which cannot happen until RQIA has granted registration. Until then it is published so that it can be read and checked.',
    patientNotice: 'Information about patients undergoing treatment is covered by our patient privacy notice, which you are given at your first appointment. This page is about the website.',
    controller: 'DY Destiny Limited, trading as Regent Orthodontics',
    scope: 'regentorthodontics.com and any other website or online booking page operated by the practice',

    // POL-55 §2. Cada supuesto lleva su base legal, que es lo que exige el
    // artículo 13 del UK GDPR y lo que la versión anterior no daba.
    collect: [
      { heading: 'If you complete an enquiry or booking form',
        text: 'Your name, contact details and whatever you choose to tell us about your enquiry. We use it to answer you and, if you go on to become a patient, it forms the start of your clinical record.',
        basis: 'Our lawful basis is that the processing is necessary to take steps at your request before entering a contract. Where you tell us something about your health, our condition for processing that is the provision of health care under Article 9(2)(h) of the UK GDPR.' },
      { heading: 'If you telephone or email us',
        text: 'The same applies. We do not record telephone calls.' },
      { heading: 'If you visit the website',
        text: 'Technical information about your device and how you used the site, in the ways described in our cookie policy.',
        basis: 'Some of this is exempt from consent under Schedule A1 to the Privacy and Electronic Communications Regulations; anything that is not is set only if you agree.' },
      { heading: 'If you ask us to keep you informed',
        text: 'Your contact details, on the basis of your consent, which you can withdraw at any time using the link in any message we send or by telling us.' },
    ],
    noSell: 'We do not buy lists, we do not sell your information, and we do not use it to make automated decisions about you or to build a profile of you.',

    // POL-55 §3. La versión anterior decía que no lo veía "nadie más":
    // omitía a los encargados del tratamiento y a los reguladores, que es
    // una declaración incompleta, no una más protectora.
    sharing: [
      'Organisations that provide services to us — the supplier of our practice management system, our website and email providers, and payment providers — under a written contract that requires them to protect your information and use it only on our instructions. A current list is available on request.',
      'A regulator such as RQIA or the General Dental Council, where we are required to disclose',
      'Anyone else the law requires, or where it is needed to protect someone from serious harm',
    ],
    sharingNote: 'Disclosures of that kind are recorded. We do not transfer your information outside the United Kingdom unless an appropriate safeguard recognised by UK law is in place, and where we do, we will tell you which one.',

    // POL-55 §4. "Eleven years" a secas prometía un plazo fijo donde la
    // política fija un mínimo.
    retention: [
      'Enquiries that do not become appointments are kept for 12 months and then deleted',
      'Where you become a patient, your records are kept for the periods in our records policy: for adults, a minimum of 11 years; for children, until their 25th birthday or 11 years, whichever is longer',
      'Marketing consents are kept until you withdraw them',
    ],

    // POL-55 §5. Faltaban tres derechos: supresión, oposición y portabilidad.
    rights: [
      'Ask for a copy of the information we hold about you',
      'Have it corrected if it is wrong',
      'Ask us to delete it',
      'Ask us to restrict what we do with it',
      'Object to what we are doing with it',
      'Ask for your information in a portable form',
    ],
    rightsNote: 'Some of these rights are qualified where we are required by law to keep clinical records. We will respond within one month.',
    complaintProcess: 'If you are unhappy with how we have handled your information, please tell us. We will acknowledge your complaint within five working days, investigate it, and give you a substantive response within one month.',
    ico: { name: "Information Commissioner's Office", url: 'https://ico.org.uk',
           phone: '0303 123 1113', registration: 'C1975741',
           note: 'You can complain to the ICO at any time, whether or not you have come to us first, and doing so will not affect your care or how we treat you.' },

    // Comprobado sobre el sitio compilado: ni una cookie, ni localStorage,
    // ni sessionStorage. POL-54 llama a esto "the least risky website" y no
    // exige banner. El único tercero son las fuentes; mientras se sirvan
    // desde Google hay que decirlo, porque transfiere la IP del visitante.
    cookies: 'This website sets no cookies of its own, stores nothing on your device and does not track you. It loads nothing from anywhere else either — the typefaces are served from this site, so visiting it does not make your browser contact a third party.',
    changes: 'We review this notice at least annually and whenever we change what we collect or who we share it with. The version in force is the one published here. Where a change materially affects you, we will draw it to your attention rather than relying on you noticing.',
  },

  // ── Esquema de publicación FOI (POL-70) ────────────────────────────
  // Una clínica que presta servicios HSC en Irlanda del Norte es autoridad
  // pública bajo la FOIA 2000 SOLO respecto de esos servicios. POL-70 está
  // redactado en presente ("provides both private and HSC"), pero el HSC
  // aún no ha empezado y el registro de RQIA está en trámite: aquí se dice
  // en el mismo tiempo verbal que el resto del sitio, que es intención.
  // Mismo tratamiento que POL-55: se publica para que pueda leerse, y toma
  // efecto cuando los servicios HSC empiecen.
  foi: {
    policyRef: 'POL-70',
    version: 'v1.1',
    confirmed: false,
    draftNote: 'This page reproduces POL-70, the practice\u2019s freedom of information publication scheme. It takes effect when the practice begins providing Health and Social Care treatment, which cannot happen until RQIA has granted registration and the HSC contract is in place. Until then it is published so that it can be read and checked.',

    basis: 'Freedom of Information Act 2000, section 19 and Schedule 1, Part III, paragraph 44',
    model: 'the Information Commissioner\u2019s model publication scheme, in the version written for authorities covered for only part of the information they hold',
    owner: 'Registered Manager',

    why: [
      'A dental practice providing Health and Social Care treatment in Northern Ireland is a public authority under the Act, but only for information about those services. The practice intends to offer HSC orthodontic treatment for children and teenagers from opening.',
      'Everything else is outside the Act: private treatment, and the business of DY Destiny Limited generally. That is why the practice uses the model scheme written for authorities covered for only part of what they hold.',
    ],
    // Va antes que las clases a propósito: es lo que más gente viene a
    // preguntar y la respuesta es que este no es su camino.
    notPersonal: 'No patient information is ever published under this scheme. If you want a copy of your own records, that is a subject access request and it goes through POL-07, not through here \u2014 ask us and we will tell you how.',

    commitments: [
      'Publish, or otherwise make routinely available, the information this scheme covers',
      'Say how that information can be obtained and whether a charge applies',
      'Publish this scheme, keep it under review and hold a copy at reception',
      'Publish any dataset that has been requested, and later versions of it, where that is reasonably practicable and in a re-usable form',
      'Keep the information under this scheme up to date',
    ],


    exempt: 'Some information is exempt and is not published. The exemptions most likely to apply are personal information about patients, staff or anyone else (section 40), information given to the practice in confidence (section 41), and information whose release would harm the commercial interests of the practice or of someone else (section 43). Information outside the Act, such as anything about private treatment, is not published here either.',

    howToAsk: [
      // Cae el renglón que empezaba "Anything in the seven classes". El
      // siguiente abría con "Anything else", que sin él se quedaba sin
      // referente: pasa a "Anything recorded", que se sostiene solo y sigue
      // siendo cierto — la sección 1 cubre todo lo registrado, clases
      // incluidas.
      'Anything recorded about our HSC services can be requested under section 1 of the Act. Put it in writing, give a name and an address for a reply, and describe what you want.',
      'We answer promptly and in any event within 20 working days. If we need to narrow the request down, or if an exemption applies, we tell you.',
    ],

    charges: 'What is on this website is free. If you want it on paper or in another format, we may charge only what it actually costs to photocopy, print and post, and we tell you the amount before we send it. If answering a request would cost more than the limit set by the Freedom of Information and Data Protection (Appropriate Limit and Fees) Regulations 2004, we say so and help you narrow it.',

    review: 'If you are unhappy with how we handled a request, ask for an internal review in writing to the Registered Manager within 40 working days of our answer. Someone who had nothing to do with the original answer carries it out, within 20 working days. If you are still dissatisfied you can complain to the Information Commissioner.',
    icoAddress: 'Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF',
    icoPhone: '0303 123 1113',
    dataNote: 'Complaints about how the practice handles personal data are a different route, under POL-05.',

    // Al retirarse las siete clases, la página dejó de ser el esquema y pasó
    // a ser un resumen de él. Esto lo dice y apunta al documento completo,
    // que es donde siguen las clases: sin ello la web prometía publicar un
    // esquema que ya no publicaba entero.
    fullScheme: 'This page is a plain-English summary. The full scheme, POL-70, including the seven classes of information it covers, is held at reception and sent free on request by email or post.',

    responsibility: 'The Registered Manager maintains this scheme, keeps the information above up to date, keeps the disclosure log and makes sure requests are answered in time. Any member of staff who receives a written request about HSC services passes it on the same day, because the 20 working days run from the day it reaches the practice. The Responsible Person is accountable overall. The scheme is reviewed annually, and whenever the ICO model changes or the practice\u2019s HSC services do.',
  },

  legal: { companyName: 'DY Destiny Limited', companyNumber: 'NI695932', vatNumber: null },
  // El Worker que recibe el formulario: valida, descarta bots y reenvía la
  // solicitud al Apps Script que ya alimentaba la lista de espera.
  formEndpoint: 'https://regent-enquiries.diego-aa6.workers.dev',
  formAcceptsHealthData: false,

  ai: {
    // No decir nunca que el tratamiento del servicio público ya se presta:
    // en Irlanda del Norte es HSC, no NHS, y la clínica no abre hasta que
    // RQIA conceda el registro (cláusula de comienzo de POL-01).
    summary: 'A specialist orthodontic practice in Newtownards, County Down, treating children and adults with fixed braces and clear aligners. All treatment is currently private. The practice intends to offer Health Service (HSC) treatment — what is called NHS treatment elsewhere in the UK — for children and teenagers from opening; adult treatment is private.',
    useWhen: [
      'Someone is looking for orthodontic treatment — braces or aligners — in Newtownards, Bangor, Comber, Holywood or the Ards peninsula',
      'A parent is asking about Health Service (NHS) orthodontics for a child or teenager in County Down — the practice intends to offer it from opening, and they can join the list now',
      'Someone wants to be treated by a GDC-registered specialist orthodontist rather than a general dentist',
      'Someone is comparing the cost of braces and aligners in County Down',
      'Someone is looking for an Invisalign provider, or for Angel Aligners, in County Down',
    ],
    dontUseWhen: [
      'Someone needs general dentistry — check-ups, fillings, hygienist — this practice only does orthodontics',
      'Someone needs emergency or out-of-hours dental care',
    ],
  },
  // ── Tarifas ────────────────────────────────────────────────────────
  // Los cargos que no son un tratamiento. Publicarlos es lo que separa una
  // página de precios de un escaparate: el paciente ya sabe qué pasa si
  // pierde el retenedor antes de aceptar el presupuesto.
  fees: {
    intro: 'Every price here is the price. At the consultation you get an indication of what your own treatment would cost; the exact figure comes with your written plan, once we have taken the records needed to work it out. From there it does not change unless you ask us to change the treatment.',
    included: [
      'All appointments for the length of the treatment',
      'The appliance itself and every adjustment',
      'X-rays, photographs and scans taken as part of the treatment',
      'Removing the appliance when treatment finishes',
      'Your retainers afterwards',
    ],
    excluded: [
      'General dental care — check-ups, fillings and hygienist visits stay with your own dentist',
      'Extractions, where they are needed, if your dentist carries them out',
      'Replacing a retainer you have lost or broken',
    ],
    // Confirmados por la clínica. Se retiran el recambio de retenedor, la
    // reparación de brackets y la copia de registros: los dos primeros no se
    // cobran como cargo aparte y la copia de registros no se cobra en
    // absoluto — que además es lo que corresponde a una solicitud de acceso
    // bajo el artículo 15 del UK GDPR, que es gratuita.
    extras: [
      { name: 'Re-bonding a fixed retainer', price: 60, from: true, confirmed: true,
        note: 'If the wire comes away from a tooth.' },
      { name: 'Missed appointment or late cancellation', price: 20, confirmed: true,
        note: 'Less than 24 hours notice. The chair time cannot be given to anyone else.' },
    ],
    // Lo que NO se cobra, dicho en voz alta: si no aparece, un paciente
    // asume que sí y no pregunta.
    noCharge: [
      'A copy of your records for another clinician, or for yourself',
    ],
    payment: {
      confirmed: true,    // Confirmado por la clínica el 21-sep-2026
      lines: [
        'There is nothing to pay on the day of the consultation.',
        'The records needed to plan your treatment are charged separately. They are additional to the treatment fee, not deducted from it.',
        'The balance can be paid up front or spread across the treatment, whichever suits you.',
        'The exact schedule is written into your plan before anything is fitted.',
      ],
    },
    note: 'These are private fees.',
  },

  // ── Primera visita ─────────────────────────────────────────────────
  firstVisit: {
    duration: '20 minutes',
    durationConfirmed: true,   // Confirmado por la clínica el 21-sep-2026
    lede: 'Nothing is fitted at the first appointment and nothing is decided on the day. It exists so that you leave knowing what is going on, what the options are and roughly what each one would cost.',
    // Tres pasos, no cuatro. Cae "The examination": los registros —
    // fotografías, radiografías, escaneos — no se hacen en esta cita, y por
    // eso se cobran aparte desde £150. Listarlos como paso de una consulta
    // gratuita hacía esperar al paciente algo que no ocurre ese día.
    steps: [
      { title: 'Before you come',
        body: 'There is nothing to prepare. If you were referred by your dentist we will already have the letter; if you booked yourself, you do not need one.' },
      { title: 'The conversation',
        body: 'We look at how your teeth meet as well as how they look, and go through which appliances would work in your case and which would not. Where an option you have read about is not the right answer for your teeth, we will say so and explain why.' },
      { title: 'Indicative prices, and the next appointment',
        body: 'You leave knowing roughly what each option would cost and what the next step is. The exact figure comes with your written plan, once we have taken the records needed to plan properly — and those are booked, not done on the day.' },
    ],
    bring: [
      'The name and address of your own dentist',
      'A list of any medication you take',
      'Your Health and Care Number (HCN)',
      'For anyone under 18, an adult with parental responsibility',
    ],
    after: 'If you decide to go ahead, you can book the next appointment before you leave. If you would rather think about it, take the plan home and ring or email when you are ready — there is no time limit on it and no one will chase you.',
  },

  // ── Derivaciones ───────────────────────────────────────────────────
  referrals: {
    lede: 'Your patient stays with you for their general care. We treat the orthodontics, write to you at the assessment and again at the end, and send them back.',
    accept: [
      'Children and teenagers',
      'Adults, including those told years ago that it was too late',
      'Crowding, spacing, overjet, crossbite and open bite',
      'Cases needing joint planning with restorative work',
      'Second opinions, including on treatment started elsewhere',
    ],
    dontAccept: [
      'General dentistry — we do not carry out check-ups, fillings or hygienist work',
      'Emergency or out-of-hours dental care',
      'Patients whose oral hygiene, periodontal disease or untreated decay needs stabilising first — send them once that is done',
    ],
    include: [
      'Patient name, date of birth, contact number and Health and Care Number (HCN)',
      'What you would like looked at',
      'Any radiographs you already have, and when they were taken',
      'Relevant medical history',
    ],
    // El correo ordinario no es un canal cifrado. Decirlo aquí es más
    // honesto que un formulario web que tampoco lo sería.
    secureNote: 'Ordinary email is not a secure channel for clinical records. Write to us without them and we will agree how to send them across.',
    afterwards: [
      'We write to you after the assessment with the diagnosis and the plan',
      'We write again when treatment finishes, with the retention regime',
      'Anything urgent, we ring you',
    ],
  },

  // Paleta tomada del documento de diseño real de la clínica:
  // oro del logotipo · matt black de marcos · polished concrete Chalk 026.
  theme: { accent: '#A98442', ink: '#1C1A17', paper: '#F7F5F1' },

  // Sin fotografías del local, por decisión de la clínica (20-sep-2026).
  // Aquí se declaraban /surgery.svg y /reception.svg: no existían, ninguna
  // página las usaba y bloqueaban el checklist. Un hueco por dos imágenes
  // que nadie había pedido ver.
  photos: [],
};
export default site;
