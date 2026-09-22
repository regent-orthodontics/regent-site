#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════
//  CHECKLIST DE CONFORMIDAD — se pasa sobre el sitio YA COMPILADO.
//  Si falla algo obligatorio, sale con código 1 y el deploy se para.
//  Comprueba el HTML de dist/, no la configuración: lo que importa es lo
//  que acaba viendo el visitante, no lo que dice el fichero de config.
// ═══════════════════════════════════════════════════════════════════════
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { site } from '../site.config.mjs';

const DIST = 'dist';
const results = [];
const check = (level, name, ok, detail = '') => results.push({ level, name, ok, detail });

if (!existsSync(DIST)) {
  console.error('✖ No existe dist/. Ejecuta "npm run build:only" primero.');
  process.exit(1);
}

// recolectar todos los .html
const html = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith('.html')) html.push(p);
  }
})(DIST);

const pages = html.map((f) => ({ file: relative(DIST, f), body: readFileSync(f, 'utf8') }));
const every = (fn) => pages.filter((p) => !fn(p.body)).map((p) => p.file);
const home = pages.find((p) => p.file === 'index.html')?.body ?? '';

// ── obligatorio en TODAS las páginas ─────────────────────────────────
const noTitle = every((b) => /<title>[^<]{5,}<\/title>/.test(b));
check('error', 'Todas las páginas tienen <title>', noTitle.length === 0, noTitle.join(', '));

const noDesc = every((b) => /<meta name="description" content="[^"]{20,}"/.test(b));
check('error', 'Todas tienen meta description', noDesc.length === 0, noDesc.join(', '));

const noCanon = every((b) => /<link rel="canonical"/.test(b));
check('error', 'Todas tienen canonical', noCanon.length === 0, noCanon.join(', '));

const noAddr = every((b) => b.includes(site.contact.address.postcode));
check('error', 'Dirección geográfica visible', noAddr.length === 0, noAddr.join(', '));

// Mientras no haya línea de la clínica no se publica número, así que lo que
// se exige es que TODAS las páginas lleven al menos un canal de contacto, y
// que un teléfono declarado aparezca de verdad. Comprobar "hay teléfono" a
// secas obligaba a publicar alguno, y el que había era un móvil personal.
if (site.contact.phone) {
  const noPhone = every((b) => b.includes(site.contact.phone));
  check('error', 'Teléfono visible', noPhone.length === 0, noPhone.join(', '));
} else {
  // Aviso y no fallo desde el 22-sep-2026, por decisión de la clínica: la línea
  // de la clínica aún no funciona y se publica con correo y formulario, que
  // son datos de contacto. Si se declara un número, la rama de arriba vuelve
  // a exigir que salga en todas las páginas.
  check('warn', 'Teléfono de la clínica publicado', false,
        'no hay línea: el móvil personal se retiró y no se ha puesto otro número');
}

const noEmail = every((b) => b.includes(site.contact.email));
check('error', 'Correo visible', noEmail.length === 0, noEmail.join(', '));

// Fecha de última revisión — requisito del regulador en sectores regulados
const noReviewed = every((b) => b.includes(`datetime="${site.compliance.lastReviewed}"`));
check(site.compliance.regulated ? 'error' : 'warn',
      'Fecha de última revisión presente', noReviewed.length === 0, noReviewed.join(', '));

// ── contenido sin JavaScript ─────────────────────────────────────────
const thin = pages.filter((p) => {
  const text = p.body.replace(/<script[\s\S]*?<\/script>/g, '')
                     .replace(/<style[\s\S]*?<\/style>/g, '')
                     .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length < 300;
}).map((p) => p.file);
check('error', 'Contenido legible sin ejecutar JavaScript', thin.length === 0,
      thin.length ? `páginas casi vacías: ${thin.join(', ')}` : '');

// ── datos estructurados ──────────────────────────────────────────────
let schemaOk = false, schemaWhy = 'no se encontró bloque JSON-LD';
const m = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (m) {
  try {
    const j = JSON.parse(m[1]);
    schemaOk = Boolean(j['@type'] && j.name && j.address?.postalCode);
    if (!schemaOk) schemaWhy = 'le faltan @type, name o address.postalCode';
  } catch (e) { schemaWhy = `JSON-LD inválido: ${e.message}`; }
}
check('error', 'Datos estructurados válidos en portada', schemaOk, schemaOk ? '' : schemaWhy);

// ── ficheros generados ───────────────────────────────────────────────
for (const f of ['llms.txt', 'robots.txt', 'sitemap-index.xml']) {
  check('error', `${f} generado`, existsSync(join(DIST, f)));
}

// ── el llms.txt no puede decir menos que la web ──────────────────────
// La web marca los precios provisionales; si el llms.txt no lo hace, un
// asistente los cita como definitivos. Es la fuga más silenciosa que hay.
if (existsSync(join(DIST, 'llms.txt'))) {
  const llms = readFileSync(join(DIST, 'llms.txt'), 'utf8');
  const hasUnconfirmed = site.services.some((s) => s.confirmed === false);
  check('error', 'llms.txt avisa de los precios sin confirmar',
        !hasUnconfirmed || /indicative/i.test(llms),
        hasUnconfirmed ? 'hay precios sin confirmar y el llms.txt no lo dice' : '');
}

// ── precios: lo que un asistente puede citar ─────────────────────────
// Un servicio gratuito tiene precio declarado: es 0. Exigir > 0 marcaba la
// consulta gratuita como si le faltara el dato.
const withPrice = site.services.filter((s) =>
  typeof s.price === 'number' && (s.price > 0 || s.free === true)).length;
check('warn', 'Todos los servicios tienen precio', withPrice === site.services.length,
      `${withPrice} de ${site.services.length}`);

// ── precios sin confirmar por el cliente ─────────────────────────────
// Un precio orientativo puesto por nosotros es un número válido: el resto
// del checklist no lo detectaría. Marcarlo con `confirmed: false` es lo
// único que impide publicar tarifas que el cliente no ha aprobado.
const unconfirmed = site.services.filter((s) => s.confirmed === false).map((s) => s.name);
check('error', 'Precios confirmados por el cliente', unconfirmed.length === 0,
      unconfirmed.length ? `sin confirmar: ${unconfirmed.join(', ')}` : '');

// ── tramos de precio sin rellenar ────────────────────────────────────
// `confirmed` se comprueba por servicio, pero un servicio confirmado puede
// llevar un tramo sin precio dentro —una marca que aún no se ha tarifado— y
// eso sale publicado como un hueco donde el paciente espera una cifra.
const tramosPendientes = site.services.flatMap((s) =>
  (s.tiers ?? []).filter((t) => t.price === null || t.pending)
                 .map((t) => `${s.name} → ${t.label}`));
check('error', 'Todos los tramos de precio tienen cifra', tramosPendientes.length === 0,
      tramosPendientes.join(', '));

// ── enlaces internos que no llevan a ninguna parte ───────────────────
// La comprobación que faltaba. El menú de esta web enlazó durante días a
// cinco páginas que no existían: compilaba, pasaba el checklist entero y
// daba 404 en producción. Un enlace roto en la navegación de un negocio
// regulado es peor que una página fea.
const hrefs = new Map();          // ruta destino → páginas que la enlazan
for (const p of pages) {
  for (const m of p.body.matchAll(/href="(\/[^"#?]*)"/g)) {
    const raw = m[1].replace(/\/$/, '') || '/';
    if (/\.(css|js|xml|txt|png|jpe?g|svg|webp|ico|woff2?)$/i.test(raw)) continue;
    if (!hrefs.has(raw)) hrefs.set(raw, new Set());
    hrefs.get(raw).add(p.file);
  }
}
const exists = (r) => {
  const rel = r === '/' ? 'index.html' : r.replace(/^\//, '');
  return existsSync(join(DIST, rel)) || existsSync(join(DIST, `${rel}.html`))
      || existsSync(join(DIST, rel, 'index.html'));
};
// El llms.txt es la puerta por la que entra un asistente. Sus rutas cuentan.
if (existsSync(join(DIST, 'llms.txt'))) {
  const llms = readFileSync(join(DIST, 'llms.txt'), 'utf8');
  for (const m of llms.matchAll(/\]\((https?:\/\/[^)]+)\)/g)) {
    try {
      const path = new URL(m[1]).pathname.replace(/\/$/, '') || '/';
      if (!hrefs.has(path)) hrefs.set(path, new Set());
      hrefs.get(path).add('llms.txt');
    } catch {}
  }
}
const broken = [...hrefs.entries()].filter(([r]) => !exists(r))
  .map(([r, from]) => `${r} (desde ${[...from].join(', ')})`);
check('error', 'Ningún enlace interno roto', broken.length === 0, broken.join(' · '));

// ── cargos accesorios sin confirmar ──────────────────────────────────
// Mismo razonamiento que con los precios de los tratamientos: un cargo por
// romper un bracket es un número que el paciente da por bueno.
const extras = site.fees?.extras ?? [];
const extraUnconf = extras.filter((e) => e.confirmed === false).map((e) => e.name);
check('error', 'Cargos accesorios confirmados', extraUnconf.length === 0,
      extraUnconf.length ? `sin confirmar: ${extraUnconf.join(', ')}` : '');
if (site.fees?.payment) {
  check('error', 'Condiciones de pago confirmadas', site.fees.payment.confirmed !== false,
        site.fees.payment.confirmed === false ? 'el texto de formas de pago es un borrador' : '');
}

// ── fotografías: declaradas vs. existentes ───────────────────────────
// Una imagen declarada cuyo fichero falta no rompe la compilación: sale una
// imagen rota en producción y nadie se entera hasta que lo ve un cliente.
const photos = site.photos ?? [];
const missing = photos.filter((p) => !existsSync(join(DIST, p.src.replace(/^\//, ''))))
                      .map((p) => p.src);
check('error', 'Los ficheros de las fotografías existen', missing.length === 0,
      missing.join(', '));
// El fichero puede existir y aun así no verse: un SVG guardado como .jpg
// pasa cualquier comprobación de existencia y sale roto en el navegador.
const magic = { jpg: [0xFF,0xD8,0xFF], jpeg: [0xFF,0xD8,0xFF], png: [0x89,0x50,0x4E,0x47],
                webp: [0x52,0x49,0x46,0x46], gif: [0x47,0x49,0x46] };
const badType = photos.filter((p) => {
  const f = join(DIST, p.src.replace(/^\//, ''));
  if (!existsSync(f)) return false;
  const ext = p.src.split('.').pop().toLowerCase();
  if (ext === 'svg') return !readFileSync(f, 'utf8').trimStart().startsWith('<');
  const sig = magic[ext];
  if (!sig) return false;
  const head = [...readFileSync(f).subarray(0, sig.length)];
  return !sig.every((b, i) => head[i] === b);
}).map((p) => p.src);
check('error', 'El contenido de cada imagen casa con su extensión', badType.length === 0,
      badType.length ? `no es lo que dice ser: ${badType.join(', ')}` : '');

const noAlt = photos.filter((p) => !p.alt || p.alt.trim().length < 10).map((p) => p.src);
check('error', 'Toda fotografía tiene texto alternativo', noAlt.length === 0, noAlt.join(', '));
const noDims = photos.filter((p) => !p.width || !p.height).map((p) => p.src);
check('warn', 'Fotografías con dimensiones declaradas', noDims.length === 0,
      noDims.length ? `sin width/height (la página salta al cargar): ${noDims.join(', ')}` : '');

// ── el mapa apunta a la dirección actual ─────────────────────────────
// Regenerar el mapa es un paso a mano. Un mapa correcto de la dirección
// anterior es el peor caso posible: se ve bien y manda al paciente a otro
// sitio. Se compara la huella que dejó scripts/build-map.py.
const addr = site.contact.address;
if (addr.lat && addr.lon) {
  const metaPath = join(DIST, 'map.meta.json');
  if (!existsSync(metaPath)) {
    check('error', 'El mapa corresponde a la dirección actual', false,
          'no hay map.meta.json — ejecuta "python3 scripts/build-map.py"');
  } else {
    const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    const drift = Math.abs(meta.lat - addr.lat) + Math.abs(meta.lon - addr.lon);
    const filesOk = (meta.files ?? []).every((f) => existsSync(join(DIST, f.replace(/^public\//, ''))));
    check('error', 'El mapa corresponde a la dirección actual', drift < 1e-6 && filesOk,
          drift >= 1e-6 ? `generado para ${meta.lat}, ${meta.lon} y el config dice ${addr.lat}, ${addr.lon} — regenéralo`
                        : (!filesOk ? 'falta alguna de las imágenes del mapa' : ''));
  }
}

// ── imágenes de los tratamientos ─────────────────────────────────────
// Un hero declarado cuya imagen falta no rompe el build: sale una página
// negra con texto flotando y nadie se entera hasta que la abre un paciente.
const heroMissing = site.services.filter((s) => s.hero?.image)
  .filter((s) => !existsSync(join(DIST, s.hero.image.replace(/^\//, ''))))
  .map((s) => `${s.name} → ${s.hero.image}`);
check('error', 'Las imágenes de los tratamientos existen', heroMissing.length === 0,
      heroMissing.join(', '));
const heroNoAlt = site.services.filter((s) => s.hero)
  .filter((s) => !s.hero.alt || s.hero.alt.trim().length < 10).map((s) => s.name);
check('error', 'Cada imagen de tratamiento tiene texto alternativo', heroNoAlt.length === 0,
      heroNoAlt.join(', '));

// ── datos de contacto provisionales ──────────────────────────────────
// Un número de móvil personal usado "mientras tanto" es un teléfono
// válido: nada más lo detectaría. Marcarlo es lo único que impide que
// acabe publicado en la web de un cliente.
const prov = [];
if (site.contact.phoneProvisional) prov.push('teléfono provisional');
// `phonePending` no entra aquí: la falta de línea ya la reporta la
// comprobación de arriba y este bloque es para datos PUBLICADOS que son
// provisionales. Contarlo dos veces convierte un fallo en dos.
if (site.contact.emailProvisional) prov.push('correo');
check('error', 'Datos de contacto definitivos', prov.length === 0,
      prov.length ? `provisional: ${prov.join(', ')}` : '');

// ── sector regulado ──────────────────────────────────────────────────
if (site.compliance.regulated) {
  const c = site.compliance;
  check('error', 'Regulador identificado', Boolean(c.regulator?.name && c.regulator?.url));
  check('error', 'Al menos un registro profesional', c.registrations.length > 0);
  check('error', 'Registros con número, cualificación y país',
        c.registrations.every((r) => r.number && r.qualifications?.length && r.country));
  // Un título profesional equivocado es un número válido para todo lo demás:
  // pasa el resto del checklist entero. "Dentist" donde el registro dice
  // "Orthodontic Therapist" describe a esa persona como algo que no es.
  const titles = c.regulator?.titles;
  if (titles?.length) {
    const wrong = c.registrations.flatMap((r) =>
      (r.qualifications ?? []).filter((q) => !titles.includes(q))
                              .map((q) => `${r.person}: "${q}"`));
    check('error', 'Cualificaciones válidas en el registro', wrong.length === 0,
          wrong.length ? `${wrong.join(', ')} — no es un título de ${c.regulator.name}` : '');
  } else {
    check('warn', 'Cualificaciones válidas en el registro', false,
          'el regulador no declara lista de títulos: nadie comprueba lo que se publica');
  }
  check('error', 'Procedimiento de reclamaciones', Boolean(c.complaints?.procedure));
  check('error', 'Vía de escalado si no satisface', Boolean(c.complaints?.escalation));

  // "specialist" es palabra protegida en algunos registros profesionales
  const bad = pages.filter((p) => /\bspecialists?\b/i.test(
    p.body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')
  )).map((p) => p.file);
  check('warn', 'Uso de "specialist" revisado a mano', bad.length === 0,
        bad.length ? `aparece en ${bad.join(', ')} — confirmar que quien firma está en el registro` : '');
}

// ── plantilla sin rellenar ───────────────────────────────────────────
const placeholders = ['Nombre del negocio', 'ejemplo.co.uk', 'BT00 0AA', 'Servicio uno', '0000 0000'];
const left = placeholders.filter((p) => JSON.stringify(site).includes(p));
check('error', 'Sin marcadores de la plantilla', left.length === 0, left.join(', '));

// ── informe ──────────────────────────────────────────────────────────
const errs = results.filter((r) => r.level === 'error' && !r.ok);
const warns = results.filter((r) => r.level === 'warn' && !r.ok);

console.log(`\n  Checklist de conformidad — ${site.name}`);
console.log(`  ${pages.length} páginas · ${site.compliance.regulated ? 'sector regulado' : 'sector no regulado'}\n`);
for (const r of results) {
  const icon = r.ok ? '✓' : r.level === 'error' ? '✖' : '!';
  console.log(`  ${icon} ${r.name}${r.detail && !r.ok ? `\n      ${r.detail}` : ''}`);
}
console.log(`\n  ${results.filter((r) => r.ok).length}/${results.length} superados` +
            (warns.length ? ` · ${warns.length} aviso(s)` : '') + '\n');

if (errs.length) {
  console.error(`  ✖ ${errs.length} fallo(s) obligatorio(s). Esta web NO se publica.\n`);
  process.exit(1);
}
console.log('  ✓ Superadas las comprobaciones automáticas.\n');
// ⚠️ Este aviso NO es decorativo. Sin él, "23/23 ✓ Apta para publicar" se lee
// como un certificado de cumplimiento, y un cliente puede intentar trasladar
// aquí su responsabilidad ante el regulador. El checklist verifica que los
// campos acordados y las pruebas técnicas están presentes en esta versión.
// No juzga si una afirmación clínica es cierta, si un consentimiento es
// válido, ni cómo interpretará el regulador una página.
console.log('  Esto comprueba que los campos acordados y las pruebas técnicas están');
console.log('  presentes en esta versión. NO valida si una afirmación clínica es');
console.log('  cierta, si un consentimiento es válido, ni cómo interpretará el');
console.log('  regulador la página. Eso lo aprueba el cliente.\n');
