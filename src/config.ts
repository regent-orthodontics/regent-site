// Public site configuration.
// Endpoints here are intentionally in the client bundle — the security boundary
// is at the Apps Script side (it validates and only appends to its sheet),
// not at URL secrecy. There is no point env-hiding these.

export const WAITLIST_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx1K8mx0ojAxV-MktleTZNzi0XAMhWDgmOFDrE2HOtYCcVsxz1DTNQi1ZrgDgtfaOZQXw/exec';

export const SITE = {
  name: 'Regent Orthodontics',
  legalName: 'DY Destiny Limited',
  companyNumber: 'NI695932',
  url: 'https://regentorthodontics.com',
  email: 'admin@regentorthodontics.com',
  referralsEmail: 'referrals@regentorthodontics.com',
  address: {
    line1: '11 Regent Street',
    city: 'Newtownards',
    region: 'County Down',
    postcode: 'BT23 4AB',
    country: 'Northern Ireland',
  },
  gdc: {
    diego: '206244',
    yesica: '269728',
  },
  openingMonth: 'December',
} as const;
