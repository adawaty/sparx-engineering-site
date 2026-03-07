// Centralized quote/contact actions (no forms).
// User-specified routing: WhatsApp + Email.

export const QUOTE_EMAIL = 'info@sparx-engineering.com';
export const WHATSAPP_NUMBER_E164 = '+201010001898';

export function buildMailto(subject: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  return `mailto:${QUOTE_EMAIL}?${params.toString()}`;
}

export function buildWhatsApp(text: string) {
  const number = WHATSAPP_NUMBER_E164.replace(/[^0-9]/g, '');
  const params = new URLSearchParams();
  if (text) params.set('text', text);
  return `https://wa.me/${number}?${params.toString()}`;
}
