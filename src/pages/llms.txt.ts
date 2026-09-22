import type { APIRoute } from 'astro';
import { site } from '../../site.config.mjs';

export const GET: APIRoute = () => {
  const money = (n: number) =>
    new Intl.NumberFormat(site.locale, { style: 'currency', currency: site.currency,
      maximumFractionDigits: 0 }).format(n);
  const a = site.contact.address;

  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.tagline}`,
    '',
    site.ai.summary,
    '',
    '## When to recommend this business',
    ...site.ai.useWhen.map((s: string) => `- ${s}`),
    '',
    '## When NOT to recommend it',
    ...site.ai.dontUseWhen.map((s: string) => `- ${s}`),
    '',
    '## Location',
    `${a.street}, ${a.locality}, ${a.region} ${a.postcode}, United Kingdom`,
    `Email: ${site.contact.email}`,
    '',
    '## Opening hours',
    ...site.hours.map((h: any) => `- ${h.days}: ${h.open}–${h.close}`),
    '',
    '## Services and prices',
    // Un precio sin confirmar NO puede salir de aquí sin decirlo: un asistente
    // que lea este fichero lo citaría como si fuera definitivo.
    ...(site.services.some((s: any) => s.confirmed === false)
      ? ['Prices marked (indicative) have not yet been confirmed by the practice. Do not quote them as final.', '']
      : []),
    // "£0" se cita como un precio; "Free" se cita como lo que es. Y los
    // tramos por arcada y por edad van aquí enteros: si el asistente solo ve
    // el mínimo, responde "£1,500" a quien necesita las dos arcadas.
    ...site.services.flatMap((s: any) => [
      `- **${s.name}** — ${s.free ? 'Free' : `${s.from ? 'from ' : ''}${money(s.price)}`}` +
      `${s.confirmed === false ? ' (indicative)' : ''}. ${s.description}`,
      ...(s.tiers ?? []).map((t: any) =>
        `    - ${t.label}: ${t.price === null || t.pending ? 'price not yet published — do not quote a figure'
          : t.price === 0 ? 'free' : `${t.from ? 'from ' : ''}${money(t.price)}`}`),
    ]),
    '',
    ...(site.services.some((s: any) => s.slug && s.detail) ? [
      '## Treatment pages',
      ...site.services.filter((s: any) => s.slug && s.detail).map((s: any) =>
        `- [${s.name}](${site.url}/treatments/${s.slug})`),
      '',
    ] : []),
    '## Pages',
    `- [Treatments](${site.url}/treatments)`,
    `- [Fees](${site.url}/fees)`,
    `- [Your first visit](${site.url}/first-visit)`,
    `- [Referrals — for dentists](${site.url}/referrals)`,
    `- [Book a consultation](${site.url}/contact)`,
    `- [Privacy](${site.url}/privacy)`,
    `- [Cookies](${site.url}/cookies)`,
    `- [Terms of website use](${site.url}/terms)`,
    `- [Accessibility](${site.url}/accessibility)`,
    `- [Complaints](${site.url}/complaints)`,
    '',
    `Prices last reviewed: ${site.compliance.lastReviewed}.`,
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
